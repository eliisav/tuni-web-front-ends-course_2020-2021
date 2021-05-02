import React, { useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import { createAnecdote, voteActionCreator, initializeAnecdotes } from "./anecdoteReducer";
import { filterChange } from "./filterReducer";
import { setNotificationMsg } from "./notificationReducer";

export const Filter = (props) => {

  const handleChange = (event) => {
    const filter = event.target.value;
    props.filterChange(filter)
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToPropsFilter = {
  filterChange,
}

export const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToPropsFilter
)(Filter)

export const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  setTimeout(() => {
    if (props.notification.notificationMsg !== "") {
      props.setNotificationMsg("", 0);
    }
  }, props.notification.seconds * 1000);

  return <>{props.notification.notificationMsg && <div style={style}>{props.notification.notificationMsg}</div>}</>;
};

const mapDispatchToPropsNotification = {
  setNotificationMsg,
}

export const ConnectedNotifications = connect(
  mapStateToProps,
  mapDispatchToPropsNotification
)(Notification)

export const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  },[dispatch]) 

  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    }
  });

  const vote = (anecdote) => {
    dispatch(setNotificationMsg(`you voted '${anecdote.content}'`, 4));
    dispatch(voteActionCreator(anecdote));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.setNotificationMsg(`anecdote created '${content}'`, 4);
    props.createAnecdote(content);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToPropsAnecdoteForm = {
  setNotificationMsg,
  createAnecdote
}

export const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToPropsAnecdoteForm
)(AnecdoteForm)