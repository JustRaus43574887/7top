import { useEffect } from "react";
import "../css/friends.css";

import { useDispatch, useSelector } from "react-redux";
import { loadMoreFriends } from "../redux/actions/mainActions";

import Account from "../Components/Account";
import Preloader from "../Components/Preloader";

const Friends = () => {
  useEffect(() => {
    document.title =
      "Мои друзья в 7top.org. Участвуй вместе, получай приятный процент от Смартконтракта 7top.org";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Получай бонус от участия приглашенных друзей. Раздели счастье выигрыша вместе с друзьями. Выплата до 5% от джекпота при условии победы вашего друга."
      );
  }, []);

  const dispatch = useDispatch();
  const me = useSelector(({ me }) => me);
  const { friends, cursor, hasMore, loading, success } = useSelector(
    ({ friends }) => friends
  );

  const loadMore = () => dispatch(loadMoreFriends(me.wallet, cursor));

  return (
    <div className="friends">
      <Account backBtn />
      {success ? (
        <section>
          <div className="container">
            {friends.map((item, index) => (
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
                  <p className="p4">Status</p>
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

export default Friends;
