"use client";

import { Button, ButtonGroup, Box, Grid, Typography, Stack } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useState, useEffect, useRef } from 'react';
import '@fontsource/roboto/300.css';

import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./styles.css"

import useSupabase from '~/auth/useSupabase';
import Container from '~/components/Container';


function QuestionText({ text }) {
	return (
		<Typography component="div" sx={{ mx: 4, mt: 20 }}>
			<Box sx={{ textAlign: 'center', fontSize: 30, minHeight: 200 }}>{text}</Box>
		</Typography>
	)
}


function ButtonGrid({ onButtonClick, disabled }) {
	const grid = [];
	for (let i = 1; i <= 6; i++)
		grid.push(
			<Button disabled={disabled} key={i} onClick={() => onButtonClick(i)} size="large" variant="contained">
				  <Typography variant="h5">{i}</Typography>
			</Button>
		);

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			mt: 25,
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
	const supabase = useSupabase();

	const [questions, setQuestions] = useState({});
	const [currQuestionId, setCurrQuestionId] = useState(-1);
	const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
	const initialRender = useRef(true);

	// Two refs are used, with each one representing a different copy of the
	// window during the transition. The two take turns being the "active" window.
	// Here, we use separate state variables to track the text in each one.

	const [refOneIsActive, setRefOneIsActive] = useState(true);
	const refOne = useRef(null);
	const refTwo = useRef(null);
	const nodeRef = refOneIsActive ? refOne : refTwo;

	const [refOneQuestion, setRefOneQuestion] = useState("");
	const [refTwoQuestion, setRefTwoQuestion] = useState("");


	// Initialize questions. Use useEffect so it runs on initialization
	useEffect(() => {
		if(supabase === null) return;
		const fetchData = async () => {
			try {
				// Get all questions, joining with Responses table on user_id
				let all_questions = await supabase.from('Questions').select(`
					*,
					Responses(user_id)
				`);

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

				// set questions
				if (Object.keys(unanswered_questions).length === 0)
					setAllQuestionsAnswered(true);
				else
					setQuestions(unanswered_questions);

			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [supabase]);


	// Change question
	const changeQuestionNum = () => {

		// Find a random unanswered question
		let keys = Object.keys(questions)
		let question_id = keys[Math.floor(Math.random() * keys.length)]

		// set the next question
		setCurrQuestionId(question_id);

		let newQuestion;
		if (allQuestionsAnswered)
			newQuestion = "You've Answered All Questions!";
		else if (Object.keys(questions).length === 0) // uninitialized
			newQuestion = "";
		else
			newQuestion = questions[question_id];

		// Don't play the animation on initial render
		if (initialRender.current)
			setRefOneQuestion(newQuestion);

		// Change the question on the other ref and switch the active ref
		else {
			setRefOneIsActive((refOneIsActive) => {
				if (refOneIsActive) setRefTwoQuestion(newQuestion);
				else setRefOneQuestion(newQuestion);

				return !refOneIsActive;
			});
		}
	};

	// React magic so it doesn't render differently on client and server
	useEffect(changeQuestionNum, [questions, allQuestionsAnswered]);


	// Store answer and change question
	const handleButtonClick = async i => {
		initialRender.current = false;

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
		if (Object.keys(newQuestions).length === 0)
			setAllQuestionsAnswered(true);
	};


	return (
		(Object.keys(questions).length !== 0 || allQuestionsAnswered) &&
		(
			<Container sx={{ overflow: "visible"}}>
				<SwitchTransition>
					<CSSTransition
						key={refOneIsActive}
						nodeRef={nodeRef}
						addEndListener={(done) => {
							nodeRef.current.addEventListener("transitionend", done, false);
						}}
						classNames="fade"
					>
						<div ref={nodeRef}>
							<QuestionText text={refOneIsActive ? refOneQuestion : refTwoQuestion}/>

							<ButtonGrid onButtonClick={handleButtonClick} disabled={allQuestionsAnswered}/>

							<Stack direction="row" justifyContent="space-between" sx={{ mx: 4 }}>
								<Typography sx={{ color: allQuestionsAnswered ? 'rgba(255, 255, 255, 0.3)' : 'white' }}>
									Strongly Disagree
								</Typography>
								<Typography sx={{ color: allQuestionsAnswered ? 'rgba(255, 255, 255, 0.3)' : 'white', textAlign: 'right' }}>
									Strongly Agree
								</Typography>
							</Stack>

							<Grid container justifyContent="flex-end">
								<Button disabled={allQuestionsAnswered} variant="text" endIcon={<FastForwardIcon />}
										sx={{ m: 4, py: 1.5 }} size="large" onClick={() => handleButtonClick(null)}>
									<Typography variant='h5'>SKIP</Typography>
								</Button>
							</Grid>
						</div>
					</CSSTransition>
				</SwitchTransition>
			</Container>
		)
	);
}