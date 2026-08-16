import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import { sampleBooks } from "../../contants"

const Home = () => {
  return <>
    <BookOverview {...sampleBooks[0]}/>

    <BookList title="latest Books" books={sampleBooks} containerClassName="mt-28"/>
  </>
};

export default Home;
