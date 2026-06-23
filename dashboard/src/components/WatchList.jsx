import React, { useState, useContext } from "react";
import { watchlist } from "../data/data";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import GeneralContext from "./GeneralContext";

const WatchList = () => {
  const [list, setList] = useState(watchlist);

  const handleDelete = (uid) => {
    setList(list.filter((item) => item.name !== uid));
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {list.length} / 50</span>
      </div>

      <ul className="list">
        {list.map((stock, index) => {
          return <WatchListItem key={index} stock={stock} onDelete={handleDelete} />;
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const handleMouseEnter = () => {
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    setShowActions(false);
  };
  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showActions && <WatchListActions uid={stock.name} onDelete={onDelete} />}
    </li>
  );
};

const WatchListActions = ({ uid, onDelete }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, "SELL");
  };

  const handleDeleteClick = () => {
    onDelete(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy" placement="top" TransitionComponent={Grow} arrow>
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>
      </span>
      <span>
        <Tooltip title="Sell" placement="top" TransitionComponent={Grow} arrow>
          <button className="sell" onClick={handleSellClick}>
            Sell
          </button>
        </Tooltip>
      </span>
      <span>
        <Tooltip
          title="Delete"
          placement="top"
          TransitionComponent={Grow}
          arrow
        >
          <button className="delete" onClick={handleDeleteClick}>Del</button>
        </Tooltip>
      </span>
      <span>
        <Tooltip
          title="Analytics"
          placement="top"
          TransitionComponent={Grow}
          arrow
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
      </span>
      <span>
        <Tooltip title="More" placement="top" TransitionComponent={Grow} arrow>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
