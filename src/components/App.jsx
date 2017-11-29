import React, { Component } from 'react'
import sqlite3 from 'sqlite3'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    // SQLite3 example
    // https://github.com/sjmelia/electron-boilerplate-sqlite/blob/master/app/index.html
    var db = new sqlite3.Database(':memory:')
    db.serialize(function() {
      db.run("CREATE TABLE lorem (info TEXT)")
      var stmt = db.prepare("INSERT INTO lorem VALUES (?)")
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i)
      }
      stmt.finalize()
      var rows = document.getElementById("database")
      db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log("" + row.id + ": " + row.info)
      })
    })
    db.close()
  }
  render() {
    console.log('App.render')
    return (
      <div>Hello, world!</div>
    )
  }
}
