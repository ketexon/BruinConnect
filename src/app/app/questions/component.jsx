"use client";

import { Button, ButtonGroup, Box, Grid, Typography, Stack } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useState, useEffect } from 'react';
import '@fontsource/roboto/300.css';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


function QuestionText({ text }) {
	return (
		<Typography component="div" sx={{ mx: 4, mt: 15 }}>
			<Box sx={{ textAlign: 'center', fontSize: 30, minHeight: 150 }}>{text}</Box>
		</Typography>
	)
}


function ButtonGrid({ onButtonClick }) {
	const grid = [];
	for (let i = 1; i <= 6; i++)
		grid.push(
			<Button key={i} onClick={() => onButtonClick(i)} size="large" variant="contained">
				  <Typography variant="h5">{i}</Typography>
			</Button>
		);

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			mt: 35,
			'& > *': {
				m: 1,
			}
		}} >
			<ButtonGroup className="buttonGroup">
				{grid}
			</ButtonGroup>
		</Box>
	)
}


export default function ({ user_id }) {

	const [questions, setQuestions] = useState({});
	const [currQuestionId, setCurrQuestionId] = useState(-1);


	// Initialize questions. Use useEffect so it runs on initialization
	useEffect(() => {

		const fetchData = async () => {
			try {
				// Get all questions
				let all_questions = await supabase.from('Questions')
					.select(`
						*,
						Responses(user_id)
					`); //.neq('Responses.user_id', user_id);

				// Create a dict of question_id: question_text
				let unanswered_questions = Object.fromEntries(
					all_questions.data
						// filter out questions that have a response from the user
						.filter(
							question => question.Responses.every(
								response => response.user_id != user_id
							)
						// format
						).map(
							question => [question.question_id, question.question_text]
						)
				);

				setQuestions(unanswered_questions);

			} catch (error) {
				console.log(error);
			}
		};
		
		fetchData();
	}, []);


	// Change question
	const changeQuestionNum = () => {
		if (!questions) return; // Don't run on initialization

		// Find a random unanswered question
		let keys = Object.keys(questions)
		let question_id = keys[Math.floor(Math.random() * keys.length)]
		
		// Change the question shown on screen
		setCurrQuestionId(question_id);
	};

	// React magic so it doesn't render differently on client and server
	useEffect(changeQuestionNum, [questions]);


	// Store answer and change question
	const handleButtonClick = async i => {

		// return if questions not loaded yet or all questions answered
		if (Object.keys(questions).length === 0)
			return;

		// insert answer into Responses table
		try {
			const { error } = await supabase
				.from('Responses')
				.insert({ question_id: currQuestionId, user_id: user_id, response: i });
		} catch (error) {
			console.log(error);
		}

		// update questions
		const newQuestions = { ...questions };
		delete newQuestions[currQuestionId];
		setQuestions(newQuestions);
	};


	return (
		<>
			<QuestionText text={Object.keys(questions).length !== 0 ? questions[currQuestionId] : "You've Answered All Questions!"}/>

			<ButtonGrid onButtonClick={handleButtonClick}/>

			<Stack direction="row" justifyContent="space-between" sx={{ mx: 4 }}>
				<Typography>Strongly Disagree</Typography>
				<Typography sx={{ textAlign: 'right' }}>Strongly Agree</Typography>
			</Stack>

			<Grid container justifyContent="flex-end">
				<Button variant="text" endIcon={<FastForwardIcon />} sx={{ mx: 5, mt: 8, py: 1.5 }} size="large"
						onClick={() => handleButtonClick(null)}>
					<Typography variant='h5'>SKIP</Typography>
				</Button>
			</Grid>
		</>
	)
}