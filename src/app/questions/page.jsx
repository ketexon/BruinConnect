"use client";

import { Button, ButtonGroup, Box, Grid, Typography, Stack } from '@mui/material';
import { spacing } from '@mui/system';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useState, useEffect, useRef } from 'react';
import '@fontsource/roboto/300.css';

const QUESTIONS = ['Question 1', 'Question 2', 'Question 3', 'Question 4'];


function QuestionText({ text }) {
	return (
		<Typography component="div" sx={{ mt: 20, mb: 40 }}>
			<Box sx={{ textAlign: 'center', fontSize: 32 }}>{text}</Box>
		</Typography>
	)
}


function ButtonGrid({ onButtonClick }) {
	const grid = [];
	for (let i = 1; i <= 6; i++)
		grid.push(<Button onClick={() => onButtonClick(i)} size="large" variant="contained"><Typography variant="h5">{i}</Typography></Button>);

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			'& > *': {
				m: 1,
			},
			mt: 20
		}} >
			<ButtonGroup className="buttonGroup">
				{grid}
			</ButtonGroup>
		</Box>
	)
}


export default function Questions() {

	const [questionNum, setQuestionNum] = useState(); // Current question shown on screen
	const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null)); // Stores answers to questions. null = not answered, -1 = skipped
	const numAnswered = useRef(0); // Number of questions the user has answered

	// Change question
	const changeQuestionNum = (seen) => {

		// Find a random unanswered question
		let index;
		do { index = Math.floor(Math.random() * QUESTIONS.length) }
		while (seen[index] != null);
		
		// Change the question shown on screen
		setQuestionNum(index);
	};

	// React magic so it doesn't render differently on client and server
	// Also gets called on initialization
	useEffect(() => changeQuestionNum(answers), []);

	// Store answer and change question
	const handleButtonClick = (i) => {

		// return if all questions answered
		if (numAnswered.current == QUESTIONS.length)
			return;

		// store answer
		const newAnswers = answers.slice()
		newAnswers[questionNum] = i;
		setAnswers(newAnswers);

		// Either show the next question or display that there are none left
		numAnswered.current++;
		if (numAnswered.current < QUESTIONS.length)
			changeQuestionNum(newAnswers);
		else
			setQuestionNum(-1); // -1 singals to render "You've Answered All Questions!"
	};


	return (
		<>
			<QuestionText text={questionNum != -1 ? QUESTIONS[questionNum] : "You've Answered All Questions!"}/>

			<ButtonGrid onButtonClick={handleButtonClick}/>

			<Stack direction="row" justifyContent="space-between" sx={{ mx: 4 }}>
				<Typography>Strongly Disagree</Typography>
				<Typography sx={{ textAlign: 'right' }}>Strongly Agree</Typography>
			</Stack>

			<Grid container justifyContent="flex-end">
				<Button variant="text" endIcon={<FastForwardIcon />} sx={{ mx: 5, mt: 5, py: 1.5 }} size="large" onClick={() => handleButtonClick(-1)}>
					<Typography variant='h5'>SKIP</Typography>
				</Button>
			</Grid>
		</>
	)
}