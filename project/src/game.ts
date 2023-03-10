import { GameType } from "./const";
import {
  Question,
  QuestionArtist,
  QuestionGenre,
  UserAnswer,
  UserArtistQuestionAnswer,
  UserGenreQuestionAnswer
} from "./types/question";


export const isAnswerCorrect = (question: Question, answer: UserAnswer): boolean => {
  if (question.type === GameType.Artist && typeof answer === 'string') {
    return isArtistAnswerCorrect(question, answer);
  }

  if (question.type === GameType.Genre && Array.isArray(answer)) {
    return isGenreAnswerCorrect(question, answer);
  }

  return false;
}

export const isArtistAnswerCorrect = (
  question: QuestionArtist,
  userAnswer: UserArtistQuestionAnswer
  ): boolean => userAnswer === question.song.artist;

export const isGenreAnswerCorrect = (
  question: QuestionGenre,
  userAnswer: UserGenreQuestionAnswer
): boolean => userAnswer.every((answer, index) =>
    answer === (question.answers[index].genre === question.genre));
