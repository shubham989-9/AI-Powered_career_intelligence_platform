import { useEffect, useMemo, useState } from "react";

import api from "../../api";

import {
  RefreshCw,
  Search,
  MessageSquareText,
  Star,
  Users,
  TrendingUp,
  TrendingDown,
  Tag,
  UserRound,
  Mail,
  Clock3,
} from "lucide-react";


function UserFeedbackManagement() {

  const [data, setData] = useState({
    statistics: {
      total_feedback: 0,
      average_rating: 0,
      highest_rating: 0,
      lowest_rating: 0,
    },
    rating_distribution: [],
    category_distribution: [],
    recent_feedback: [],
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);


  // =====================================================
  // FETCH DATA
  // =====================================================

  const fetchData = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/admin/feedback/overview",
        {
          params: {
            search,
          },

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setData(response.data);

    } catch (error) {

      console.error(
        "User Feedback Management Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchData();

  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchData();

    }, 350);

    return () => clearTimeout(timer);

  }, [search]);


  const stats =
    data.statistics;


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString(
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


  // =====================================================
  // RATING PERCENTAGE
  // =====================================================

  const totalRatings =
    data.rating_distribution.reduce(
      (total, item) =>
        total + item.count,
      0
    );


  const getRatingPercentage = (
    count
  ) => {

    if (!totalRatings) {
      return 0;
    }

    return Math.round(
      (count / totalRatings) * 100
    );
  };


  // =====================================================
  // CATEGORY TOTAL
  // =====================================================

  const totalCategories =
    data.category_distribution.reduce(
      (total, item) =>
        total + item.count,
      0
    );


  // =====================================================
  // STAR RENDERER
  // =====================================================

  const renderStars = (
    rating,
    size = 15
  ) => {

    return (

      <div className="flex items-center gap-0.5">

        {[1, 2, 3, 4, 5].map(
          (star) => (

            <Star
              key={star}
              size={size}
              className={
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-700"
              }
            />

          )
        )}

      </div>

    );

  };


  return (

    <div className="
      min-h-screen
      bg-[#050816]
      px-6
      py-8
      text-white
      lg:px-10
    ">

      <div className="
        mx-auto
        max-w-[1500px]
      ">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          mb-8
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-end
          md:justify-between
        ">

          <div>

            <div className="
              mb-3
              flex
              items-center
              gap-2
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-pink-400
            ">

              <MessageSquareText
                size={17}
              />

              Feedback Management

            </div>


            <h1 className="
              text-3xl
              font-black
              tracking-tight
              md:text-4xl
            ">

              User Feedback Management

            </h1>


            <p className="
              mt-2
              text-sm
              text-slate-400
            ">

              Monitor user feedback, ratings,
              categories and platform satisfaction.

            </p>

          </div>


          <button
            onClick={fetchData}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-[#15112d]
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-200
              transition
              hover:border-pink-400/30
              hover:bg-pink-500/10
            "
          >

            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

        </div>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="
          mb-7
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        ">


          {/* TOTAL FEEDBACK */}

          <StatCard
            title="Total Feedback"
            value={stats.total_feedback}
            subtitle="User submissions"
            icon={MessageSquareText}
          />


          {/* AVERAGE */}

          <StatCard
            title="Average Rating"
            value={`${stats.average_rating} / 5`}
            subtitle="Overall satisfaction"
            icon={Star}
            positive
          />


          {/* HIGHEST */}

          <StatCard
            title="Highest Rating"
            value={`${stats.highest_rating} / 5`}
            subtitle="Best submitted rating"
            icon={TrendingUp}
            positive
          />


          {/* LOWEST */}

          <StatCard
            title="Lowest Rating"
            value={`${stats.lowest_rating} / 5`}
            subtitle="Lowest submitted rating"
            icon={TrendingDown}
            danger
          />

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="
          mb-7
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#15112d]
          p-4
        ">

          <div className="
            relative
          ">

            <Search
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />


            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="
                Search user, email, category or feedback...
              "
              className="
                w-full
                rounded-xl
                border
                border-white/[0.1]
                bg-[#0d0920]
                py-3
                pl-12
                pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-slate-600
                focus:border-pink-400/40
              "
            />

          </div>

        </div>


        {/* =================================================
            DISTRIBUTION GRID
        ================================================= */}

        <div className="
          mb-7
          grid
          grid-cols-1
          gap-5
          xl:grid-cols-2
        ">


          {/* =================================================
              RATING DISTRIBUTION
          ================================================= */}

          <div className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#15112d]
            p-6
          ">

            <div className="
              mb-6
              flex
              items-center
              gap-3
            ">

              <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-yellow-400/10
                text-yellow-400
              ">

                <Star size={19} />

              </div>


              <div>

                <h2 className="
                  text-lg
                  font-bold
                ">

                  Rating Distribution

                </h2>

                <p className="
                  mt-1
                  text-xs
                  text-slate-500
                ">

                  User satisfaction by rating

                </p>

              </div>

            </div>


            <div className="
              space-y-4
            ">

              {data.rating_distribution.map(
                (item) => (

                <div
                  key={item.rating}
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div className="
                    flex
                    w-20
                    shrink-0
                    items-center
                    gap-2
                  ">

                    <span className="
                      text-sm
                      font-semibold
                      text-slate-300
                    ">

                      {item.rating}

                    </span>

                    <Star
                      size={14}
                      className="
                        fill-yellow-400
                        text-yellow-400
                      "
                    />

                  </div>


                  <div className="
                    h-2
                    flex-1
                    overflow-hidden
                    rounded-full
                    bg-white/[0.06]
                  ">

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-yellow-400
                        transition-all
                      "
                      style={{
                        width:
                          `${getRatingPercentage(
                            item.count
                          )}%`,
                      }}
                    />

                  </div>


                  <span className="
                    w-12
                    text-right
                    text-xs
                    font-semibold
                    text-slate-400
                  ">

                    {item.count}

                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* =================================================
              CATEGORY DISTRIBUTION
          ================================================= */}

          <div className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#15112d]
            p-6
          ">

            <div className="
              mb-6
              flex
              items-center
              gap-3
            ">

              <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-cyan-400/10
                text-cyan-400
              ">

                <Tag size={19} />

              </div>


              <div>

                <h2 className="
                  text-lg
                  font-bold
                ">

                  Feedback Categories

                </h2>

                <p className="
                  mt-1
                  text-xs
                  text-slate-500
                ">

                  Distribution across feedback areas

                </p>

              </div>

            </div>


            {data.category_distribution.length === 0 ? (

              <div className="
                flex
                min-h-[180px]
                items-center
                justify-center
                text-sm
                text-slate-600
              ">

                No category data available.

              </div>

            ) : (

              <div className="
                space-y-4
              ">

                {data.category_distribution.map(
                  (item) => {

                  const percentage =
                    totalCategories
                      ? Math.round(
                          (item.count /
                            totalCategories) *
                            100
                        )
                      : 0;

                  return (

                    <div
                      key={item.category}
                    >

                      <div className="
                        mb-2
                        flex
                        items-center
                        justify-between
                      ">

                        <span className="
                          text-sm
                          font-medium
                          text-slate-300
                        ">

                          {item.category}

                        </span>


                        <span className="
                          text-xs
                          text-slate-500
                        ">

                          {item.count}
                          {" "}
                          ({percentage}%)

                        </span>

                      </div>


                      <div className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-white/[0.06]
                      ">

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-cyan-400
                            transition-all
                          "
                          style={{
                            width:
                              `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </div>

        </div>


        {/* =================================================
            RECENT FEEDBACK
        ================================================= */}

        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#15112d]
        ">


          <div className="
            border-b
            border-white/[0.08]
            px-5
            py-5
          ">

            <h2 className="
              text-lg
              font-bold
            ">

              Recent User Feedback

            </h2>


            <p className="
              mt-1
              text-xs
              text-slate-500
            ">

              Latest feedback submitted by users

            </p>

          </div>


          {loading ? (

            <div className="
              flex
              min-h-[280px]
              items-center
              justify-center
              gap-3
              text-sm
              text-slate-500
            ">

              <RefreshCw
                size={18}
                className="animate-spin"
              />

              Loading feedback data...

            </div>

          ) : data.recent_feedback.length === 0 ? (

            <div className="
              flex
              min-h-[280px]
              flex-col
              items-center
              justify-center
              text-center
            ">

              <MessageSquareText
                size={38}
                className="text-slate-700"
              />

              <p className="
                mt-3
                text-sm
                font-semibold
                text-slate-400
              ">

                No feedback found

              </p>

              <p className="
                mt-1
                text-xs
                text-slate-600
              ">

                User feedback will appear here.

              </p>

            </div>

          ) : (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
                min-w-[1150px]
                text-left
              ">

                <thead>

                  <tr className="
                    border-b
                    border-white/[0.08]
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-500
                  ">

                    <th className="px-5 py-4">
                      User
                    </th>

                    <th className="px-5 py-4">
                      Rating
                    </th>

                    <th className="px-5 py-4">
                      Category
                    </th>

                    <th className="px-5 py-4">
                      Feedback
                    </th>

                    <th className="px-5 py-4">
                      Submitted
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.recent_feedback.map(
                    (feedback) => (

                    <tr
                      key={feedback.id}
                      className="
                        border-b
                        border-white/[0.06]
                        transition
                        hover:bg-white/[0.025]
                      "
                    >

                      {/* USER */}

                      <td className="
                        px-5
                        py-5
                      ">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          <div className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-pink-500/10
                            text-pink-400
                          ">

                            <UserRound
                              size={17}
                            />

                          </div>


                          <div>

                            <p className="
                              text-sm
                              font-semibold
                              text-slate-200
                            ">

                              {feedback.user_name ||
                                "Unknown User"}

                            </p>


                            <p className="
                              mt-1
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-slate-600
                            ">

                              <Mail size={12} />

                              {feedback.user_email ||
                                "No email"}

                            </p>


                            <p className="
                              mt-1
                              text-[10px]
                              text-slate-700
                            ">

                              User ID #{feedback.user_id}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* RATING */}

                      <td className="
                        px-5
                        py-5
                      ">

                        <div className="
                          space-y-2
                        ">

                          {renderStars(
                            feedback.rating
                          )}

                          <p className="
                            text-xs
                            font-semibold
                            text-yellow-400
                          ">

                            {feedback.rating} / 5

                          </p>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td className="
                        px-5
                        py-5
                      ">

                        {feedback.category ? (

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.06]
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-cyan-300
                          ">

                            <Tag size={12} />

                            {feedback.category}

                          </span>

                        ) : (

                          <span className="
                            text-xs
                            text-slate-600
                          ">

                            Uncategorized

                          </span>

                        )}

                      </td>


                      {/* MESSAGE */}

                      <td className="
                        max-w-[500px]
                        px-5
                        py-5
                      ">

                        <p className="
                          max-w-[480px]
                          text-sm
                          leading-6
                          text-slate-300
                        ">

                          {feedback.message}

                        </p>

                      </td>


                      {/* DATE */}

                      <td className="
                        px-5
                        py-5
                      ">

                        <div className="
                          flex
                          items-center
                          gap-2
                          whitespace-nowrap
                          text-xs
                          text-slate-500
                        ">

                          <Clock3 size={14} />

                          {formatDate(
                            feedback.created_at
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  positive = false,
  danger = false,
}) {

  return (

    <div className="
      rounded-2xl
      border
      border-white/[0.08]
      bg-[#15112d]
      p-5
    ">

      <div className="
        flex
        items-start
        justify-between
      ">

        <div>

          <p className="
            text-sm
            text-slate-400
          ">

            {title}

          </p>


          <p className="
            mt-3
            text-3xl
            font-black
          ">

            {value}

          </p>


          <p className="
            mt-1
            text-xs
            text-slate-600
          ">

            {subtitle}

          </p>

        </div>


        <div className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          ${
            danger
              ? "bg-red-500/10 text-red-400"
              : positive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-pink-500/10 text-pink-400"
          }
        `}>

          <Icon size={20} />

        </div>

      </div>

    </div>
  );
}


export default UserFeedbackManagement;