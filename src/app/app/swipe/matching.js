import createServerClient from "~/auth/createServerClient.js";
var similarity = require( 'compute-cosine-similarity' );


export default async function (user_id) {
    const supabase = createServerClient();

    try {

        // get number of total questions
        const { _, count: num_questions } = await supabase.from('Questions').select(
            '*',
            { count: 'exact', head: true }
        );

        // get responses from unswiped users
        const { data: responses } = await supabase.from('unswiped_users').select(`
            *,
            Responses(question_id, response)
        `);

        // get response for current user
        const { data: user_responses} = await supabase.from('Responses').select(`
            *
        `).eq('user_id', user_id);

        // add user responses to list of all users we're interested in
        responses.push({'UserUID': user_id, 'Responses': user_responses})

        // turn each set of responses for a certain user into a vector
        const user_vectors = responses.reduce((acc, curr_user) => {

            // each user's vector
            let curr_vector = new Array(num_questions).fill(0);
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
            .sort(([, vectorA], [, vectorB]) => similarity(user_vector, vectorB) - similarity(user_vector, vectorA))
            .map(([user_id, _]) => user_id);

        return similar_users;

    } catch (error) {
        console.log(error);
    }
}