import React, { FC, useEffect } from "react";
import "./App.css";
import WebCamCapture from "./WebCamCapture";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PreView from "./PreView";
import "./PreView.css";
import Chats from "./Chats";
import ChatView from "./ChatView";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";

const App: FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser)
        dispatch(
          login({
            userName: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      else dispatch(logout());
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app-logo"
              src="https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg"
              alt="snapchat logo"
            />

            <div className="app-body">
              <div className="app-body-background">
                <Switch>
                  <Route exact path="/">
                    <WebCamCapture />
                  </Route>
                  <Route exact path="/preview">
                    <PreView />
					
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/chat/view">
                    <ChatView />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
