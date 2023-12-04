require("dotenv").config();
const express = require("express");
const jsforce = require("jsforce");
const app = express();
const axios = require("axios");
const PORT = 5000;

// --------------------------------------------------------------------------------------------------------------------//
// Access the data from salesforce by using the SQL
const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;
const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL,
});

conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
  if (err) {
    console.error(err);
  } else {
    console.log("🚀 ~ file: index.js:14 ~ conn.login ~ userInfo:", userInfo.id);
    console.log(
      "🚀 ~ file: index.js:14 ~ conn.login ~ userInfo:",
      userInfo.organizationId
    );
  }
});

app.get("/SQL", (req, res) => {
  conn.query("SELECT Id, Name FROM Account", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log("🚀 ~ file: index.js:29 ~ conn.query ~ result:", result);
      res.json(result.records);
    }
  });
});

// --------------------------------------------------------------------------------------------------------------------//

app.listen(PORT, () => {
  console.log("Server us running at port " + PORT);
});

// --------------------------------------------------------------------------------------------------------------------//
// Access the data from salesforce by using the Graphql

app.get("/Graphql", async (req, res) => {
  const getdata = await getAccountsData();
  console.log("🚀 ~ file: index.js:49 ~ app.get ~ getdata:", getdata);
  res.json(getdata);
});

const { SF_GRAPHQL_URL, SF_GRAPHQL_SESSION_ID, SF_GRAPHQL_VERSION } =
  process.env;

async function getAccountsData() {
  const query = {
    query:
      "query accounts { uiapi { query { Account { edges { node { Id Name { value } } } } } } }",
  };

  const response = await axios({
    url: SF_GRAPHQL_URL + "/services/data/v" + SF_GRAPHQL_VERSION + "/graphql",
    method: "post",
    data: query,
    headers: {
      Authorization: `Bearer ${SF_GRAPHQL_SESSION_ID}`,
    },
  });
  const obj = response.data.data.uiapi.query.Account;
  return obj;
  // const str = JSON.stringify(obj, null, 4);
  // return str;
  // .then(function (response) {
  // const obj = response.data.data.uiapi.query.Account;
  // const str = JSON.stringify(obj, null, 4);
  // let output = ''

  // output += "***********ACCOUNT****************\n";
  // output += str;
  // output += '\n********************END OF ACCOUNTS******************\n'
  // console.log("🚀 ~ file: index.js:74 ~ getAccountsData ~ output:", output)
  // return output;
  // })
  // .catch(function (error){
  //     console.log("🚀 ~ file: index.js:78 ~ getAccountsData ~ error:", error)
  //     return error;
  // });
}

// --------------------------------------------------------------------------------------------------------------------//
