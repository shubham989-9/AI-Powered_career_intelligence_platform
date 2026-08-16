import { useEffect, useState } from "react";

import api from "../../../api";

import {
  MessageSquareText,
  Star,
  Send,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";


function Feedback() {

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const [feedbackHistory, setFeedbackHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  // =====================================================
  // FETCH MY FEEDBACK
  // =====================================================

  const fetchFeedback = async () => {

    try {

      setHistoryLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/feedback/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setFeedbackHistory(
        response.data
      );

    } catch (err) {

      console.error(
        "Failed to fetch feedback:",
        err
      );

    } finally {

      setHistoryLoading(false);

    }

  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchFeedback();

  }, []);


  // =====================================================
  // SUBMIT FEEDBACK
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSuccess("");
    setError("");


    // ===================================================
    // VALIDATION
    // ===================================================

    if (rating < 1 || rating > 5) {

      setError(
        "Please select a rating between 1 and 5."
      );

      return;
    }


    if (!message.trim()) {

      setError(
        "Please enter your feedback message."
      );

      return;
    }


    try {

      setLoading(true);


      const token =
        localStorage.getItem("token");


      // =================================================
      // SUBMIT
      // =================================================

      await api.post(
        "/feedback/",
        {
          rating: rating,

          category:
            category || null,

          message:
            message.trim(),
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "Thank you! Your feedback has been submitted successfully."
      );


      // =================================================
      // RESET FORM
      // =================================================

      setRating(0);

      setHoverRating(0);

      setCategory("");

      setMessage("");


      // =================================================
      // REFRESH HISTORY
      // =================================================

      await fetchFeedback();

    } catch (err) {

      console.error(
        "Feedback submission failed:",
        err
      );


      setError(
        err.response?.data?.detail ||
        "Failed to submit feedback. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };


  return (

    <div className="
      min-h-screen
      bg-slate-950
      px-6
      py-8
      text-white
      lg:px-10
    ">

      <div className="
        mx-auto
        max-w-6xl
      ">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          mb-8
        ">

          <div className="
            mb-3
            flex
            items-center
            gap-2
            text-sm
            font-bold
            uppercase
            tracking-wider
            text-cyan-400
          ">

            <MessageSquareText
              size={17}
            />

            Your Feedback

          </div>


          <h1 className="
            text-3xl
            font-black
            tracking-tight
            md:text-4xl
          ">

            Help Us Improve HirePulse

          </h1>


          <p className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-slate-400
          ">

            Share your experience with us.
            Your feedback helps us improve
            the platform for everyone.

          </p>

        </div>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-[1fr_0.85fr]
        ">


          {/* =================================================
              FEEDBACK FORM
          ================================================= */}

          <div className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-6
            md:p-8
          ">

            <div className="
              mb-7
            ">

              <h2 className="
                text-xl
                font-bold
              ">

                Share Your Feedback

              </h2>


              <p className="
                mt-1
                text-sm
                text-slate-500
              ">

                Tell us what you think about
                your experience.

              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="
                space-y-6
              "
            >


              {/* =================================================
                  RATING
              ================================================= */}

              <div>

                <label className="
                  mb-3
                  block
                  text-sm
                  font-semibold
                  text-slate-300
                ">

                  How would you rate your experience?

                </label>


                <div className="
                  flex
                  items-center
                  gap-2
                ">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setRating(star)
                        }
                        onMouseEnter={() =>
                          setHoverRating(star)
                        }
                        onMouseLeave={() =>
                          setHoverRating(0)
                        }
                        className="
                          rounded-lg
                          p-1
                          transition
                          hover:scale-110
                        "
                        aria-label={
                          `Rate ${star} out of 5`
                        }
                      >

                        <Star
                          size={30}
                          className={
                            star <=
                            (
                              hoverRating ||
                              rating
                            )
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-700"
                          }
                        />

                      </button>

                  ))}

                </div>


                <p className="
                  mt-2
                  text-xs
                  text-slate-500
                ">

                  {rating === 0
                    ? "Select a rating"
                    : `${rating} out of 5 stars`}

                </p>

              </div>


              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div>

                <label
                  htmlFor="feedback-category"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-300
                  "
                >

                  Feedback Category

                </label>


                <select
                  id="feedback-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    focus:border-cyan-500
                  "
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="General">
                    General
                  </option>

                  <option value="Resume">
                    Resume
                  </option>

                  <option value="ATS">
                    ATS Analysis
                  </option>

                  <option value="Job Recommendation">
                    Job Recommendation
                  </option>

                  <option value="Career Recommendation">
                    Career Recommendation
                  </option>

                  <option value="Course Recommendation">
                    Course Recommendation
                  </option>

                  <option value="Skill Gap">
                    Skill Gap
                  </option>

                  <option value="Resume Improvement">
                    Resume Improvement
                  </option>

                  <option value="Resume Builder">
                    Resume Builder
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* =================================================
                  MESSAGE
              ================================================= */}

              <div>

                <label
                  htmlFor="feedback-message"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-300
                  "
                >

                  Your Feedback

                </label>


                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  placeholder="Tell us what you liked, what can be improved, or any suggestions..."
                  rows={6}
                  maxLength={1000}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-cyan-500
                  "
                />


                <div className="
                  mt-2
                  text-right
                  text-xs
                  text-slate-600
                ">

                  {message.length}/1000

                </div>

              </div>


              {/* =================================================
                  SUCCESS MESSAGE
              ================================================= */}

              {success && (

                <div className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-4
                  py-3
                  text-sm
                  text-emerald-400
                ">

                  <CheckCircle2
                    size={18}
                    className="
                      mt-0.5
                      shrink-0
                    "
                  />

                  <span>
                    {success}
                  </span>

                </div>

              )}


              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {error && (

                <div className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-400
                ">

                  <AlertCircle
                    size={18}
                    className="
                      mt-0.5
                      shrink-0
                    "
                  />

                  <span>
                    {error}
                  </span>

                </div>

              )}


              {/* =================================================
                  SUBMIT BUTTON
              ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-cyan-500
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                  transition
                  hover:bg-cyan-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {loading ? (

                  <>

                    <LoadingSpinner />

                    Submitting...

                  </>

                ) : (

                  <>

                    <Send
                      size={17}
                    />

                    Submit Feedback

                  </>

                )}

              </button>

            </form>

          </div>


          {/* =================================================
              PREVIOUS FEEDBACK
          ================================================= */}

          <div className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            p-6
            md:p-8
          ">

            <div className="
              mb-6
            ">

              <h2 className="
                text-xl
                font-bold
              ">

                Your Previous Feedback

              </h2>


              <p className="
                mt-1
                text-sm
                text-slate-500
              ">

                Your submitted feedback history.

              </p>

            </div>


            {/* =================================================
                HISTORY LOADING
            ================================================= */}

            {historyLoading ? (

              <div className="
                flex
                min-h-[250px]
                items-center
                justify-center
                gap-2
                text-sm
                text-slate-500
              ">

                <LoadingSpinner />

                Loading feedback...

              </div>

            ) : feedbackHistory.length === 0 ? (

              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="
                flex
                min-h-[250px]
                flex-col
                items-center
                justify-center
                text-center
              ">

                <MessageSquareText
                  size={38}
                  className="
                    text-slate-700
                  "
                />


                <p className="
                  mt-3
                  text-sm
                  font-semibold
                  text-slate-400
                ">

                  No feedback submitted yet

                </p>


                <p className="
                  mt-1
                  max-w-xs
                  text-xs
                  leading-5
                  text-slate-600
                ">

                  Your feedback submissions
                  will appear here.

                </p>

              </div>

            ) : (

              /* =================================================
                 FEEDBACK HISTORY LIST
              ================================================= */

              <div className="
                max-h-[650px]
                space-y-4
                overflow-y-auto
                pr-1
              ">

                {feedbackHistory.map(
                  (item) => (

                    <div
                      key={item.id}
                      className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-950
                        p-4
                      "
                    >

                      <div className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      ">


                        {/* STARS */}

                        <div className="
                          flex
                          items-center
                          gap-0.5
                        ">

                          {[1, 2, 3, 4, 5].map(
                            (star) => (

                              <Star
                                key={star}
                                size={14}
                                className={
                                  star <= item.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-700"
                                }
                              />

                            )
                          )}

                        </div>


                        {/* CATEGORY */}

                        {item.category && (

                          <span className="
                            rounded-full
                            bg-cyan-500/10
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            text-cyan-400
                          ">

                            {item.category}

                          </span>

                        )}

                      </div>


                      {/* MESSAGE */}

                      <p className="
                        mt-4
                        text-sm
                        leading-6
                        text-slate-300
                      ">

                        {item.message}

                      </p>


                      {/* DATE */}

                      <div className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        text-[11px]
                        text-slate-600
                      ">

                        <Clock3
                          size={12}
                        />

                        {formatDate(
                          item.created_at
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );
}


// =========================================================
// LOADING SPINNER
// =========================================================

function LoadingSpinner() {

  return (

    <span className="
      inline-block
      h-4
      w-4
      animate-spin
      rounded-full
      border-2
      border-white/30
      border-t-white
    " />

  );

}


export default Feedback;