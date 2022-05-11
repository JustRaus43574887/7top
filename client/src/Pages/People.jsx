import "../css/people.css";

import { useDispatch, useSelector } from "react-redux";
import { loadMoreUsers } from "../redux/actions/mainActions";

import Account from "../Components/Account";
import Preloader from "../Components/Preloader";
import { useEffect } from "react";

const People = () => {
  const dispatch = useDispatch();
  const { allUsers, cursor, hasMore, loading, success } = useSelector(
    ({ users }) => users
  );

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  const loadMore = () => dispatch(loadMoreUsers(cursor));

  return (
    <div className="people">
      <Account backBtn />
      {success ? (
        <section>
          <div className="container">
            {allUsers.map((item, index) => (
              <div className="comp" key={index}>
                <div className="elipse_">
                  <div className="elipse3_">
                    <img
                      src={item.avatar}
                      alt="avatar"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="text">
                  <p className="p3">{item.name}</p>
                  <p className="p4">
                    {item.wallet.substr(0, 6) +
                      "..." +
                      item.wallet.substr(30, 4)}
                  </p>
                </div>
              </div>
            ))}

            {hasMore && (
              <button
                style={{ textAlign: "center", justifyContent: "center" }}
                className="btn"
                disabled={loading}
                onClick={loadMore}
              >
                Load more
              </button>
            )}
          </div>
        </section>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default People;
