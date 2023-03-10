import {Navigate} from 'react-router-dom';
import {AppRoute, GameType, MAX_MISTAKE_COUNT} from '../../const';
import {Question, UserAnswer} from '../../types/question';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkUserAnswer, incrementStep } from '../../store/action';
import Mistakes from '../../components/mistakes/mistakes';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

function GameScreen(): JSX.Element {
  const {step, mistakes, questions} = useAppSelector((state) => state);

  const question = questions[step];

  const dispatch = useAppDispatch();

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return <Navigate to={AppRoute.Lose} />;
  }

  if (step >= questions.length || !question) {
    return <Navigate to={AppRoute.Root} />;
  }

  const onUserAnswer = (questionItem: Question, userAnswer: UserAnswer) => {
    dispatch(incrementStep());
    dispatch(checkUserAnswer({question: questionItem, userAnswer}));
  }

  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default GameScreen;
