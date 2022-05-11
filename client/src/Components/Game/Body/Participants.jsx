import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwners, loadMoreOwners } from "../../../redux/actions/tronActions";

import Men2 from "../../../img/men2.png";

const Body = () => {
  const dispatch = useDispatch();
  const [
    { total, cursor, hasMore, owners },
    contract,
  ] = useSelector(({ owners, contract }) => [owners, contract]);
  const language = useSelector(({ language }) => language);

  useEffect(() => {
    if (contract) dispatch(getOwners(contract));
  }, [dispatch, contract]);

  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    if (hasMore && bottom && contract)
      dispatch(loadMoreOwners(contract, cursor));
  }, [bottom, hasMore, dispatch, contract, cursor]);

  const handleScroll = useCallback((e) =>
    setBottom(
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50
    )
  );

  return (
    <div className="participants">
      <div className="title">
        <img src={Men2} alt="men" />
        <p>
          {language.result.page.game[5]}
          <span>{total}</span>
        </p>
      </div>

      <div className="accounts" onScroll={handleScroll}>
        {owners.map((item, index) => (
          <div key={index}>
            <p className="p6">{index}</p>
            <div className="avatar">
              <div className="elipse2">
                <img
                  src={item.avatar}
                  style={{ objectFit: "cover" }}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="name">
              <p className="name">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
