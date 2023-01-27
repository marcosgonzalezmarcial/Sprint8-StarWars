import { memo } from "react";
import { Link } from "react-router-dom";

const GridItemLinkCard = ({ item }) => {
  return (
    <Link className="grid-item" to={item?.name.replaceAll(" ", "~")}>
      <div className="grid-item__hero">
        <img
          className="grid-item__img"
          src={item?.imgUrl || item?.image}
          alt={item?.name}
        />
      </div>
      <div className="text-secondary bg-dark p-3 grid-item__info">
        <h4>{item?.name}</h4>
        {<p>{item.name ?? item.model ?? item?.terrain}</p>}
      </div>
    </Link>
  );
};

export default memo(GridItemLinkCard);
