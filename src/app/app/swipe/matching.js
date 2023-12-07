import createServerClient from "~/auth/createServerClient.js";
var similarity = require( 'compute-cosine-similarity' );


export default async function (user_id) {
    const supabase = createServerClient();

    try {

        // Wrap each database query in a function
        const getNumQuestions = () => supabase.from('Questions').select('*', { count: 'exact', head: true });
        const getUnswipedUsersResponses = () => supabase.from('unswiped_users').select('*');
        const getUserResponses = () => supabase.from('Responses').select('*').eq('user_id', user_id);

        // Use Promise.all to execute all queries simultaneously
        const [numQuestionsResult, unswipedUsersResult, userResponsesResult] = await Promise.all([
            getNumQuestions(),
            getUnswipedUsersResponses(),
            getUserResponses()
        ]);

        // Destructure results
        const { _, count: num_questions } = numQuestionsResult;
        const { data: responses } = unswipedUsersResult;
        const { data: user_responses } = userResponsesResult;

        // add user responses to list of all users we're interested in
        responses.push({'UserUID': user_id, 'Responses': user_responses})

        // turn each set of responses for a certain user into a vector
        const user_vectors = responses.reduce((acc, curr_user) => {

            // each user's vector
            let curr_vector = new Array(num_questions).fill(0);
            if (curr_user.responses != null)
                for (const response of Object.values(curr_user.Responses))
                    curr_vector[response.question_id-1] = response.response; // question ids start at 1
        
            // add vector to accumulator
            acc[curr_user.UserUID] = curr_vector;
            return acc;
        }, {});

        // extract the current user's vector
        const user_vector = user_vectors[user_id];

        // compute the similarity with all other users and sort descending on similarity
        const similar_users = Object.entries(user_vectors)
            .filter(([curr_id, ]) => curr_id !== user_id)
            .map(([user_id, vector]) => {
                let sim = similarity(user_vector, vector);
                return [user_id, sim ? sim : 0];
            })
            .sort(([, similarityA], [, similarityB]) => similarityB - similarityA)
            .map(([user_id, _]) => user_id);

        return similar_users;

    } catch (error) {
        console.log(error);
    }
}