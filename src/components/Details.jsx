import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import Modal from "./Modal";

function Details() {
  const dispatch = useDispatch();
  const details = useSelector((store) => store.findDetails);
  const history = useHistory();
  const { id } = useParams();

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);
  // console.log("++++++++++++++++++++++");
  setTimeout(() => {
    // console.log("details length ", details?.length);
  }, 300);
  // console.log(id);
  // // console.log("details =", details[0]?.image);
  // // console.log("filtered details =", details[0]?.image);

  // EDIT BUTTON onClick handler

  const clickEdit = () => {
    dispatch({ type: "SET_EDIT_ITEM", payload: { id } });

    history.push("/edit/" + id);
  };
  // const clickDelete = () => {
  //   dispatch({ type: "DELETE_RECIPE", payload: { id } });
  //   // history.push("/edit/" + id);
  //   console.log("delete");
  // };

  return (
    <div className="px-9">
      {/* <h2>Details</h2> */}
      <div className="mb-11 flex flex-col justify-center items-center">
        <img
          className="details-image rounded-lg mb-6"
          src={
            details[0]?.image && details[0]?.image.length > 0
              ? details[0].image
              : "https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
          }
        />
        <h1 class="h1 mb-5">{details[0]?.title}</h1>
        <div className="flex flex-col flex-md-row w-full">
          <div className="ingredients mb-9">
            <h4 className="font-bold">Ingredients: </h4>
            <ul>
              {details.length > 1 ? (
                details.map((detail) => {
                  return (
                    <>
                      <li className="list-disc">
                        {detail.amount} {detail.name}
                      </li>
                    </>
                  );
                })
              ) : (
                <li className="list-disc ml-4">
                  {details[0]?.amount} {details[0]?.name}
                </li>
              )}
            </ul>
          </div>
          <div className="instructions">
            <h4 className="font-bold">Instructions: </h4>
            <h3>{details[0]?.instructions}</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <button className="button" onClick={clickEdit}>
          EDIT
        </button>
        <button onClick={() => setShow(true)} className="delete-button">
          Delete
        </button>
        <Modal onClose={() => setShow(false)} show={show} />
        {/* <button className="delete-button" onClick={clickDelete}>
          DELETE RECIPE
        </button> */}
      </div>
    </div>
  );
}
export default Details;
