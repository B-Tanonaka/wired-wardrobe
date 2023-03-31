import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import ReviewsAndRatings from './ReviewsRatings/ReviewsAndRatings';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';
import Navbar from './SharedComponents/Navbar';
import SiteAnnouncement from './SharedComponents/SiteAnnouncement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const rnrRef = React.useRef(null);
  const qnaRef = React.useRef(null);
  const relatedRef = React.useRef(null);
  const handleScroll = (element) => {
    if (element === 'related') {
      relatedRef.current.scrollIntoView();
    } else if (element === 'qna') {
      qnaRef.current.scrollIntoView();
    } else if (element === 'rnr') {
      rnrRef.current.scrollIntoView();
    }
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Navbar handleScroll={handleScroll} />
        <SiteAnnouncement />
        <div className="body-no-navbar">
          <Routes>
            <Route path="/" element={<Navigate to="/40344" />} />
            <Route path="/NotFound" element={<div>404 not found...</div>} />
            <Route
              path="/:productId"
              element={(
                <>
                  <ProductDetails handleScroll={handleScroll} />
                  <div ref={relatedRef}>
                    <RelatedItems />
                  </div>
                  <div ref={qnaRef} id="qna-block">
                    <QuestionsAnswers />
                  </div>
                  <div className="testHt" ref={rnrRef}>
                    <ReviewsAndRatings />
                  </div>
                </>
            )}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
