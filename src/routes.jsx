import React from "react"
import { Route, Switch } from "wouter"
import SubReddit from "./containers/Subreddit"
import Search from "./containers/Search"
import Entry from "./containers/Entry"

export const urls = {
  home: "/",
  r: "/r/:subreddit",
  forR: name => `/r/${name}`,
  entry: "/r/:subreddit/comments/:entryId",
  forEntry: (subreddit, entryId) => `/r/${subreddit}/comments/${entryId}`
}

export const Routes = () => (
  <Switch>
    <Route path={urls.home} component={Search} />
    <Route path={urls.entry}>
      {({ subreddit, entryId }) => (
        <Entry subreddit={subreddit} entryId={entryId} />
      )}
    </Route>
    <Route path={urls.r}>
      {params => <SubReddit subreddit={params.subreddit} />}
    </Route>
  </Switch>
)
