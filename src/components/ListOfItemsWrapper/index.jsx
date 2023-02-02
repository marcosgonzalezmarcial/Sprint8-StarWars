import { memo, useCallback } from "react";
import { useHeightObserver } from "hooks/useHeightObserver";
import ListOfItems from "components/ListOfItems";

import "./ListOfItemsWrapper.scss";

const ListOfItemsWrapper = ({ itemType, elementData, itemSubType }) => {

  const { dynamicSize, fromRef } = useHeightObserver({ isLoading: false });

  const showButton = useCallback(() => {
    if (window.innerWidth < 700) {
      if (dynamicSize.height > 130) {
        if (dynamicSize.height < 140) {
          if (itemSubType === "pilots") {
            return null
          }
        }
      }
      if (dynamicSize.height > 130) {
        return <input type="checkbox" className="view-more-btn" />
      }
    }
  }, [dynamicSize.height, itemSubType])

  return (
    <>
      <div ref={fromRef} className="list-of-items-wrapper">
        {itemType === "films" && (
          <>
            <h3 >Appearances</h3>
            <ListOfItems itemType={itemType} listOfUrls={elementData.films} />
          </>
        )}
        {itemType === "starships" && (
          <>
            <h3 >Starships</h3>
            <ListOfItems
              itemType={itemType}
              listOfUrls={elementData.starships}
            />
          </>
        )}
        {itemType === "characters" && itemSubType === "pilots" && (
          <>
            <h3>Pilots</h3>
            <ListOfItems itemType={itemType} listOfUrls={elementData.pilots} />
          </>
        )}
        {itemType === "characters" && itemSubType === "residents" && (
          <>
            <h3 >Residents</h3>
            <ListOfItems
              itemType={itemType}
              listOfUrls={elementData.residents}
            />
          </>
        )}
      </div>
      {showButton()}


    </>
  );
};

export default memo(ListOfItemsWrapper);
