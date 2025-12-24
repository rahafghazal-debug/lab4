/*const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// ✅ هذا المهم
app.use(express.json());
app.use(cookieParser());

// نخدم HTML
app.use(express.static(path.join(__dirname, "public")));

let users = [
    { id: 1, username: "admin", password: "admin123", email: "admin@test.com", roleid: 2 },
    { id: 2, username: "wiener", password: "peter", email: "w@test.com", roleid: 1 }
  ];
  
  let sessions = {};
  
  app.post("/login", (req, res) => {
    const { username, password } = req.body || {};
  
    const user = users.find(
      u => u.username === username && u.password === password
    );
  
    if (!user) {
      return res.status(401).json({ success: false });
    }
  
    sessions[username] = user;
    res.cookie("user", username);
  
    res.json({ success: true });
  });
  
  app.get("/profile", (req, res) => {
    const user = sessions[req.cookies.user];
    if (!user) return res.status(401).json({ error: "Not logged in" });
    res.json(user);
  });
  
  app.post("/profile", (req, res) => {
    const user = sessions[req.cookies.user];
    if (!user) return res.status(401).json({ error: "Not logged in" });
  
    if (req.body.email) user.email = req.body.email;
    if (req.body.roleid) user.roleid = req.body.roleid; // ❌ الثغرة
  
    res.json(user);
  });
  
  app.get("/admin", (req, res) => {
    const user = sessions[req.cookies.user];
    if (!user || user.roleid !== 2) {
      return res.status(403).send("Forbidden");
    }
  
    res.send("<h1>Admin Panel</h1>");
  });
  
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );console.log("SERVER STARTED ✅");

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

/* USERS */
/************************************************
  console.log("SERVER STARTED ✅");

const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

/* USERS *//*
const users = [
  { username: "wiener", password: "peter", apiKey: "W1ENER-API-KEY" },
  { username: "carlos", password: "montoya", apiKey: "CARLOS-SECRET-KEY" },
];

/* LOGIN *//*
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (!user) return res.status(401).send("Invalid credentials");
  res.send("Logged in");
});

/* ❌ VULNERABLE ENDPOINT *//*
app.get("/account", (req, res) => {
  console.log("ACCOUNT HIT 🔥", req.query);

  const id = req.query.id;
  const user = users.find(u => u.username === id);
  if (!user) return res.status(404).send("User not found");

  res.json({
    username: user.username,
    apiKey: user.apiKey
  });
});

/* STATIC FILES *//*
app.use(express.static(path.join(__dirname, "public")));*/

/*app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});*//*
app.listen(5000, () => {
    console.log("SERVER STARTED ✅ on port 5000");
  });
  




/** *******************************
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

/* Middleware *//*
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secure-secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* Fake users database *//*
const users = [
  { username: "wiener", password: "peter", apiKey: "W1ENER-API-KEY" },
  { username: "carlos", password: "montoya", apiKey: "CARLOS-SECRET-KEY" },
];

/* Serve frontend *//*
app.use(
  "/labUserIdRequest",
  express.static(path.join(__dirname, "public/labUserIdRequest"))
);

/* LOGIN *//*
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // store authenticated user in session
  req.session.user = { username: user.username };

  res.json({ message: "Logged in successfully" });
});

/* 🔐 SECURE ACCOUNT ENDPOINT *//*
app.get("/account", (req, res) => {
  // check authentication
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // 🔒 IGNORE req.query.id COMPLETELY
  const loggedInUser = req.session.user.username;

  const user = users.find((u) => u.username === loggedInUser);

  res.json({
    username: user.username,
    apiKey: user.apiKey,
  });
});

/* LOGOUT *//*
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

/* START SERVER *//*
app.listen(7000, () => {
  console.log("SECURE SERVER STARTED ✅ http://localhost:7000");
});
*/

//lab 6****************************************************************************
/*
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "guid-lab-secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* ===== Fake Database ===== *//*
const users = [
  {
    id: "9f1c3a8e-12ab-44cc-a111",
    username: "wiener",
    password: "peter",
    apiKey: "W1ENER-API-KEY",
  },
  {
    id: "4a92dd71-88ef-9abc-b222",
    username: "carlos",
    password: "montoya",
    apiKey: "CARLOS-SECRET-KEY",
  },
];

const posts = [
  {
    id: 1,
    title: "بوست كارلوس",
    content: "هذا بوست تجريبي مكتوب بواسطة كارلوس",
    author: "carlos",
    authorId: "4a92dd71-88ef-9abc-b222",
  },
];

/* ===== Static Frontend ===== *//*
app.use(
    "/lab6",
    express.static(path.join(__dirname, "public/lab6"))
  );
  
/* ===== Auth ===== *//*
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  req.session.user = {
    username: user.username,
    id: user.id,
  };

  res.json({ message: "Logged in" });
});

/* ===== Blog ===== *//*
app.get("/blog", (req, res) => {
  res.json(posts);
});

/* ===== Profile (GUID visible here) ===== *//*
app.get("/profile", (req, res) => {
  const id = req.query.id; // USER CONTROLLED

  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    username: user.username,
    id: user.id,
  });
});

/* ===== Account (VULNERABLE) ===== *//*
app.get("/account", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Not authenticated" });

  const id = req.query.id; // 🔥 VULNERABILITY

  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    username: user.username,
    apiKey: user.apiKey,
  });
});

app.listen(9000, () =>
  console.log("SERVER STARTED ✅ http://localhost:9000")
);
*/

// lab 6 sescured 
/*********************************************** 
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secure-session-secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* ===== Fake Database ===== *//*
const users = [
  {
    id: "9f1c3a8e-12ab-44cc-a111",
    username: "wiener",
    password: "peter",
    apiKey: "W1ENER-API-KEY",
  },
  {
    id: "4a92dd71-88ef-9abc-b222",
    username: "carlos",
    password: "montoya",
    apiKey: "CARLOS-SECRET-KEY",
  },
];

const posts = [
  {
    id: 1,
    title: "بوست كارلوس",
    content: "هذا بوست تجريبي مكتوب بواسطة كارلوس",
    author: "carlos",
  },
];

/* ===== Static Frontend ===== */
/*
app.use(
    "/lab6-secured",
    express.static(path.join(__dirname, "public/lab6/lab6-secured"))
  );
  
/* ===== Auth ===== *//*
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  req.session.user = {
    username: user.username,
    id: user.id,
  };

  res.json({ message: "Logged in" });
});

/* ===== Logout ===== *//*
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

/* ===== Blog (PUBLIC) ===== *//*
app.get("/blog", (req, res) => {
  res.json(posts);
});

/* ===== Profile (SECURE) ===== */
/* ===== SECURE PROFILE ===== *//*
app.get("/profile", (req, res) => {
    const id = req.query.id;
  
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).send("User not found");
  
    // ✅ معلومات عامة فقط
    res.json({
      username: user.username
    });
  });
  

/* ===== Account (SECURE) ===== */
/* ===== SECURE ACCOUNT ===== *//*
app.get("/account", (req, res) => {
    if (!req.session.user)
      return res.status(401).json({ message: "Not authenticated" });
  
    const user = users.find(
      u => u.username === req.session.user.username
    );
  
    res.json({
      username: user.username,
      apiKey: user.apiKey
    });
  });
  

app.listen(9000, () =>
  console.log("✅ SERVER RUNNING http://localhost:9000")
);
*/








//lab 7 secured 
//**************************************** */
/*
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

/* ===== Middleware ===== *//*
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "lab7-secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* ===== Fake Database ===== *//*
const users = [
  {
    username: "wiener",
    password: "peter",
    apiKey: "W1ENER-API-KEY",
  },
  {
    username: "carlos",
    password: "montoya",
    apiKey: "CARLOS-SECRET-KEY",
  },
];

/* ===== Static Frontend ===== *//*
app.use("/lab7", express.static(path.join(__dirname, "public/lab7")));

/* ===== Login ===== *//*
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  req.session.user = { username: user.username };

  res.redirect("/lab7/index.html");
});

/* ===== Logout ===== *//*
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/lab7/index.html");
  });
});

/* ===== Account (INTENTIONALLY VULNERABLE) ===== *//*
app.get("/account", (req, res) => {
    const id = req.query.id; // 🔥 USER CONTROLLED
  
    const user = users.find(u => u.username === id);
    if (!user) {
      return res.redirect("/lab7/index.html");
    }
  
    // 🔴 DATA LEAK IN REDIRECT RESPONSE BODY
    res
      .status(302)
      .set("Location", "/lab7/index.html")
      .send(`
        <h3>Redirecting...</h3>
        <p><strong>API Key:</strong> ${user.apiKey}</p>
      `);
  });
  

/* ===== Start Server ===== *//*
app.listen(10000, () =>
  console.log("✅ SERVER RUNNING http://localhost:10000")
);


/*app.get("/account", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not authenticated");
  }*/





  //lab3 not sec **********************************
  /*
  const express = require("express");
  const cookieParser = require("cookie-parser");
  const path = require("path");
  
  const app = express();
  
  /* ===== Middleware ===== *//*
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  /* ===== Static Frontend ===== *//*
  app.use("/lab3", express.static(path.join(__dirname, "public/lab3")));
  
  /* ===== Fake Database ===== *//*
  const users = [
    { username: "admin", password: "admin123", isAdmin: true },
    { username: "carlos", password: "123456", isAdmin: false },
  ];
  
  /* ===== LOGIN (VULNERABLE) ===== *//*
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  
    // 🔴 VULNERABILITY:
    // User role stored in client-controlled cookie
    res.cookie("Admin", user.isAdmin ? "true" : "false");
  
    res.json({
      username: user.username,
      admin: user.isAdmin, // UI only
    });
  });
  
  /* ===== ADMIN PANEL (VULNERABLE) ===== *//*
  app.get("/admin", (req, res) => {
    const isAdmin = req.cookies.Admin;
  
    // 🔴 Trusting user-controlled cookie
    if (isAdmin !== "true") {
      return res.status(403).send("Access denied");
    }
  
    res.send(`
      <h1>Admin Panel</h1>
      <p>Welcome Admin</p>
      <ul>
        ${users
          .filter((u) => u.username !== "admin")
          .map((u) => `<li>${u.username}</li>`)
          .join("")}
      </ul>
    `);
  });
  
  /* ===== START SERVER ===== *//*
  app.listen(10000, () => {
    console.log("✅ Server running http://localhost:10000/lab3/index.html");
  });
   */






  //lab3 sec***********************************
  /*
  const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

/* ===== Middleware ===== *//*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secure-role-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
  })
);

/* ===== Static Frontend ===== *//*
app.use("/lab3-secure", express.static(path.join(__dirname, "public/lab3-secure")));

/* ===== Fake Users ===== *//*
const users = [
  { username: "admin", password: "admin123", isAdmin: true },
  { username: "carlos", password: "123456", isAdmin: false }
];

/* ===== LOGIN (SECURE) ===== *//*
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // ✅ role stored server-side only
  req.session.user = {
    username: user.username,
    isAdmin: user.isAdmin
  };

  res.json({ message: "Logged in" });
});

/* ===== LOGOUT ===== *//*
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/lab3-secure/index.html");
  });
});

/* ===== ADMIN PANEL (SECURE) ===== *//*
app.get("/admin", (req, res) => {
  if (!req.session.user || req.session.user.isAdmin !== true) {
    return res.status(403).send("Access denied");
  }

  res.send(`
    <h1>Admin Panel</h1>
    <p>Welcome ${req.session.user.username}</p>
    <ul>
      ${users
        .filter(u => u.username !== "admin")
        .map(u => `<li>${u.username}</li>`)
        .join("")}
    </ul>
  `);
});

/* ===== START ===== *//*
app.listen(12000, () =>
  console.log("✅ SECURE SERVER http://localhost:12000/lab3-secure/index.html")
);
*/







//lab4 not secured *****************************************************
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

/* ===== Middleware ===== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "lab4-secret",
    resave: false,
    saveUninitialized: false,
  })
);

/* ===== Fake Database ===== */
const users = [
  {
    username: "wiener",
    password: "peter",
    email: "wiener@test.com",
    roleId: 1, // user
  },
  {
    username: "carlos",
    password: "montoya",
    email: "carlos@test.com",
    roleId: 1,
  },
  {
    username: "admin",
    password: "admin123",
    email: "admin@test.com",
    roleId: 2, // admin
  },
];

/* ===== Static Frontend ===== */
app.use("/lab4", express.static(path.join(__dirname, "public/lab4")));

/* ===== Login ===== */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = user.username;

  res.json({
    username: user.username,
    email: user.email,
    roleId: user.roleId,
  });
});

/* ===== Account Update (VULNERABLE) ===== */
app.post("/account/update", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not authenticated");
  }

  const user = users.find((u) => u.username === req.session.user);

  // 🔴 VULNERABILITY: roleId controlled by user
  if (req.body.email) user.email = req.body.email;
  if (req.body.roleId) user.roleId = req.body.roleId;

  res.json({
    username: user.username,
    email: user.email,
    roleId: user.roleId,
  });
});

/* ===== Admin Panel ===== */
app.get("/admin", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not authenticated");
  }

  const user = users.find((u) => u.username === req.session.user);

  if (user.roleId !== 2) {
    return res.status(403).send("Access denied");
  }

  res.send(`
    <h1>Admin Panel</h1>
    <ul>
      ${users
        .filter((u) => u.username !== "admin")
        .map((u) => `<li>${u.username}</li>`)
        .join("")}
    </ul>
  `);
});

/* ===== Start ===== */
app.listen(10000, () =>
  console.log("✅ Server running http://localhost:10000")
);
