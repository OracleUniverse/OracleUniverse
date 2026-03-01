
import { BlogPost, Video } from './types';

// ... (existing ORACLE_NEWS and BLOG_POSTS)

export const YOUTUBE_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Advanced PLSQL Patterns for Modern Apps',
    thumbnail: 'https://img.youtube.com/vi/GdKc6jA7loQ/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=GdKc6jA7loQ',
    duration: '9:10',
    views: 'New',
    publishedAt: 'Recent'
  },
  {
    id: 'v2',
    title: 'Oracle 26ai The Vector Engine',
    thumbnail: 'https://img.youtube.com/vi/-id52WTsufY/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=-id52WTsufY',
    duration: '5:06',
    views: '2 views',
    publishedAt: '2 days ago'
  },
  {
    id: 'v3',
    title: 'Oracle SQL Intro 1 Arabic',
    thumbnail: 'https://img.youtube.com/vi/gNPZDcq7Vo0/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=gNPZDcq7Vo0',
    duration: '5:17',
    views: '9 views',
    publishedAt: '7 months ago'
  },
  {
    id: 'v4',
    title: 'Oracle SQL Intro 1 English',
    thumbnail: 'https://img.youtube.com/vi/XKAAvdMT4iI/maxresdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=XKAAvdMT4iI',
    duration: '4:22',
    views: '3 views',
    publishedAt: '7 months ago'
  }
];

// ...

export interface OracleNews {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  type: 'News' | 'Release' | 'Security';
}

export const ORACLE_NEWS: OracleNews[] = [
  {
    id: 'n1',
    title: 'Oracle Database 23c Free – Developer Release is Now Available',
    source: 'Oracle Newsroom',
    date: 'Oct 28, 2024',
    summary: 'The latest features of 23c are now accessible to all developers for free. Start building with JSON Relational Duality today.',
    type: 'Release'
  },
  {
    id: 'n2',
    title: 'New Security Patch Advisory for 19c and 21c',
    source: 'Security Alert',
    date: 'Nov 02, 2024',
    summary: 'Oracle has released critical security updates addressing several high-severity vulnerabilities in core database components.',
    type: 'Security'
  },
  {
    id: 'n3',
    title: 'Oracle and NVIDIA Expand Sovereign AI Partnership',
    source: 'Tech Insider',
    date: 'Nov 05, 2024',
    summary: 'OCI is launching new sovereign AI regions powered by NVIDIA Blackwell to ensure data residency and security.',
    type: 'News'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '17',
    title: '4 SQL Syntax Upgrades You Need to Use Today',
    excerpt: "For years, Oracle developers have had to memorize a specific set of \"Oracle-isms\"—quirky workarounds needed to write standard SQL. With Oracle 23ai and 26ai, those days are over.",
    content: `
      ## 📝 Introduction
      For years, Oracle developers have had to memorize a specific set of "Oracle-isms"—quirky workarounds needed to write standard SQL. If you wanted to calculate a simple math equation, you had to query a dummy table. If you wanted a true/false column, you had to fake it with numbers.

      With the release of Oracle 23ai and the newly minted Oracle 26ai, those days are over. Oracle has completely modernized its SQL engine to align with developer expectations. Let’s look at the top four Quality of Life (QoL) SQL syntax upgrades you should start using today.

      ### 1. The End of \`FROM DUAL\`
      In older versions of Oracle, every \`SELECT\` statement strictly required a \`FROM\` clause. To get around this when evaluating expressions, developers used the dummy \`DUAL\` table. It was extra typing for no real benefit. Today, Oracle natively supports developer-friendly expression evaluation.

      **🚫 The Old Way:**
      \`\`\`sql
      SELECT SYSDATE FROM DUAL;
      SELECT UPPER('hello world') FROM DUAL;
      \`\`\`

      **✅ The Modern Way:**
      \`\`\`sql
      SELECT SYSDATE;
      SELECT UPPER('hello world');
      \`\`\`

      ### 2. Native \`BOOLEAN\` Data Type
      Historically, Oracle SQL lacked a true boolean data type. Developers had to use \`NUMBER(1)\` (storing 1 or 0) or \`VARCHAR2(1)\` (storing 'Y' or 'N') and enforce it with \`CHECK\` constraints. Now, \`TRUE\` and \`FALSE\` are native to the SQL engine.

      **✅ The Modern Way:**
      \`\`\`sql
      CREATE TABLE tasks (
          task_name VARCHAR2(100),
          is_completed BOOLEAN DEFAULT FALSE
      );

      INSERT INTO tasks VALUES ('Learn Oracle 26ai', TRUE);

      -- Notice how clean the WHERE clause is now!
      SELECT * FROM tasks WHERE is_completed;
      \`\`\`

      ### 3. \`GROUP BY\` Column Aliases
      Have you ever written a complex mathematical formula in your \`SELECT\` list, only to realize you have to copy and paste that exact formula into your \`GROUP BY\` clause? It violated the DRY (Don't Repeat Yourself) principle and made code hard to read. Now, you can simply reference the alias!

      **✅ The Modern Way:**
      \`\`\`sql
      SELECT EXTRACT(YEAR FROM hire_date) AS hire_year, COUNT(*) 
      FROM employees 
      GROUP BY hire_year; -- Clean, readable, and maintainable!
      \`\`\`

      ### 4. Idempotent DDL (\`IF EXISTS\` / \`IF NOT EXISTS\`)
      When writing setup scripts, trying to \`DROP\` a table that didn't exist threw an ugly \`ORA-00942\` error. To prevent setup scripts from failing, DBAs had to write clunky PL/SQL exception handlers. Oracle now supports standard idempotent DDL.

      **✅ The Modern Way:**
      \`\`\`sql
      DROP TABLE IF EXISTS my_temp_table;
      CREATE TABLE IF NOT EXISTS users (id NUMBER, name VARCHAR2(50));
      \`\`\`
      
      **Conclusion:** Stop writing SQL like it's 2012! By adopting these four features, your scripts will be shorter, cleaner, and much easier for junior developers to understand.
    `,
    author: 'Oracle Developer',
    date: 'Feb 28, 2026',
    category: 'SQL',
    image: '/sql-syntax-modern.png',
    tags: ['SQL', '23ai', '26ai', 'Oracle']
  },
  {
    id: '16',
    title: 'Supercharge Your Database – High-Performance SQL',
    excerpt: 'Explore the massive data manipulation (DML) and concurrency enhancements introduced in Oracle 23ai/26ai that completely change how we build high-traffic apps.',
    content: `
      ## 🚀 Introduction
      While syntax upgrades make your code prettier, performance upgrades keep your applications running when millions of users hit your system. In this article, we cover the massive data manipulation (DML) and concurrency enhancements introduced in Oracle 23ai/26ai that completely change how we build high-traffic apps.

      ### 1. Lock-Free Reservations (The E-Commerce Game Changer)
      Imagine you are building an e-commerce checkout. If 100 people try to buy the same popular item simultaneously, older databases put a "lock" on the inventory row. 99 people must wait in a queue for the 1st person's transaction to finish. Oracle solved this with \`RESERVABLE\` columns. It allows concurrent transactions to update a column *without* locking the row, mathematically guaranteeing the balance won't drop below zero!

      **✅ The Modern Way:**
      \`\`\`sql
      CREATE TABLE products (
          product_id NUMBER PRIMARY KEY,
          product_name VARCHAR2(100),
          quantity_in_stock NUMBER RESERVABLE -- The Magic Keyword!
      );

      -- 100 users can run this update simultaneously without locking each other!
      UPDATE products 
      SET quantity_in_stock = quantity_in_stock - 1 
      WHERE product_id = 99;
      \`\`\`

      ### 2. Multi-Row \`INSERT\` with a Single \`VALUES\` Clause
      Inserting multiple rows at once used to require the strange \`INSERT ALL\` syntax or looping through multiple \`INSERT INTO\` statements. Now, Oracle supports standard comma-separated row inserts, massively speeding up batch loading.

      **✅ The Modern Way:**
      \`\`\`sql
      INSERT INTO colors (id, name) 
      VALUES 
        (1, 'Red'), 
        (2, 'Green'), 
        (3, 'Blue');
      \`\`\`

      ### 3. Direct Joins in \`UPDATE\` and \`DELETE\`
      Updating records in Table A based on a condition in Table B used to require slow correlated subqueries. You can now use a \`FROM\` clause directly inside an \`UPDATE\` statement.

      **✅ The Modern Way:**
      \`\`\`sql
      UPDATE employees e
      SET e.salary = e.salary * 1.10
      FROM departments d
      WHERE e.dept_id = d.id 
        AND d.name = 'Sales';
      \`\`\`

      ### 4. Enhanced \`RETURNING INTO\` (Old & New Values)
      When updating a row in PL/SQL, you could use \`RETURNING INTO\` to see the *new* value. But if you wanted the *old* value for an audit log, you had to run a separate \`SELECT\` query first. Now, you can grab both instantly.

      **✅ The Modern Way:**
      \`\`\`sql
      DECLARE
          v_old_sal NUMBER;
          v_new_sal NUMBER;
      BEGIN
          UPDATE employees SET salary = salary * 1.10 WHERE emp_id = 101
          RETURNING OLD salary, NEW salary INTO v_old_sal, v_new_sal;
          
          DBMS_OUTPUT.PUT_LINE('Salary increased from ' || v_old_sal || ' to ' || v_new_sal);
      END;
      \`\`\`
    `,
    author: 'Performance Expert',
    date: 'Feb 28, 2026',
    category: 'Database',
    image: '/db-performance-high.png',
    tags: ['Database', 'Performance', 'SQL', 'Concurrency']
  },
  {
    id: '15',
    title: 'Modern Database Magic – JSON & JavaScript',
    excerpt: "JSON Relational Duality allows you to store your data in highly normalized, secure relational tables while exposing it as a Duality View. Plus, run JavaScript inside the database kernel.",
    content: `
      ## 🏗️ Introduction
      For years, the developer world has been split. Application developers love NoSQL (JSON) databases like MongoDB because fetching a single JSON document is incredibly easy. DBAs prefer Relational Databases (Oracle) because they guarantee data security and prevent duplication. In Oracle 23ai and 26ai, you no longer have to choose.

      ### 1. JSON Relational Duality (The Ultimate Bridge)
      JSON Relational Duality allows you to store your data in highly normalized, secure relational tables (e.g., \`Orders\`, \`Order_Items\`, \`Customers\`). However, you expose this data to your application developers as a **Duality View**.

      **How it works:** The App Developer sends a simple REST API \`PUT\` request containing a nested JSON document. Oracle intercepts the JSON, shreds it, updates the underlying relational tables securely, handles the locks, and ensures data integrity. *The Result?* The developer gets the ease of MongoDB, and the DBA gets the security of Oracle. No complex ORM tools required!

      ### 2. Multilingual Engine (MLE): JavaScript inside the Database
      Not every developer wants to learn PL/SQL, but almost every developer knows JavaScript. Historically, if you wanted to process data with JS, you had to pull millions of rows out of the database and across the network into a Node.js server—a massive performance killer.

      Oracle embedded the V8 JavaScript engine directly inside the database kernel via the Multilingual Engine (MLE). You can now write stored procedures natively in JavaScript!

      **✅ The Modern Way:**
      \`\`\`sql
      CREATE OR REPLACE MLE MODULE my_js_module LANGUAGE JAVASCRIPT AS
      export function calculateDiscount(price, discountPercent) {
          if (price < 0) return 0;
          return price - (price * (discountPercent / 100));
      }
      /

      -- Call the JS function directly in your SQL!
      SELECT product_name, 
             calculateDiscount(price, 20) AS discounted_price 
      FROM products;
      \`\`\`
    `,
    author: 'Modern Architect',
    date: 'Feb 28, 2026',
    category: 'Database',
    image: '/json-js-oracle.png',
    tags: ['JSON', 'JavaScript', 'MLE', 'Database']
  },
  {
    id: '14',
    title: 'DBA Quality of Life – Security & Architecture',
    excerpt: 'The role of the DBA is shifting. Oracle 23ai and 26ai introduced powerful features like Schema-Level Privileges and SQL Domains designed to make life easier.',
    content: `
      ## 🛡️ Introduction
      The role of the Database Administrator (DBA) is shifting. DBAs spend less time manually installing software and more time managing cloud architecture, data models, and security. Oracle 23ai and 26ai introduced powerful features designed specifically to make the DBA's life easier.

      ### 1. Schema-Level Privileges
      If a developer needed read access to every table in an \`HR\` schema, the DBA used to write a script to \`GRANT SELECT\` on 50 individual tables. If a new table was added later, the developer lost access until the DBA ran another grant. Now, you can grant privileges to an entire schema dynamically!

      **✅ The Modern Way:**
      \`\`\`sql
      GRANT SELECT ANY TABLE ON SCHEMA hr TO data_analyst_user;
      \`\`\`

      ### 2. The \`DB_DEVELOPER_ROLE\`
      Every time a DBA creates a new user for an application developer, they have to remember a laundry list of privileges (\`CREATE SESSION\`, \`CREATE TABLE\`, etc.). Often, out of frustration, DBAs just grant the \`DBA\` role—a massive security risk. Oracle finally created a built-in, least-privilege role designed perfectly for application builders.

      **✅ The Modern Way:**
      \`\`\`sql
      CREATE USER modern_dev IDENTIFIED BY StrongPassword123;
      GRANT DB_DEVELOPER_ROLE TO modern_dev;
      \`\`\`

      ### 3. SQL Domains (Centralized Data Rules)
      How many times have you written the exact same \`CHECK\` constraint to validate an email address across five different tables? SQL Domains allow you to define a data rule *once* and apply it anywhere.

      **✅ The Modern Way:**
      \`\`\`sql
      -- 1. Create the Domain once
      CREATE DOMAIN email_domain AS VARCHAR2(255)
         CONSTRAINT CHECK (REGEXP_LIKE(email_domain, '^.*@.*\\..*$'));

      -- 2. Apply it to any table
      CREATE TABLE customers (id NUMBER, contact_email email_domain);
      CREATE TABLE employees (id NUMBER, work_email email_domain);
      \`\`\`
    `,
    author: 'Senior DBA',
    date: 'Feb 28, 2026',
    category: 'Security',
    image: '/dba-security.png',
    tags: ['Security', 'DBA', 'Architecture', 'SQL Domains']
  },
  {
    id: '13',
    title: 'Low-Code Revolution – Top Oracle APEX Features',
    excerpt: 'Oracle APEX is dominating the enterprise low-code space. Experience Git-style branching, native workflows, and Generative AI integrations.',
    content: `
      ## 🚀 Introduction
      Oracle APEX is dominating the enterprise low-code space. If you are a developer looking to build web and mobile applications 20x faster than traditional React/Node.js stacks, APEX is the tool to learn. With recent updates running on the 23ai/26ai database architecture, APEX has solved its biggest historical limitations.

      ### 1. Working Copies (Git for APEX)
      For years, the biggest complaint about APEX was team development. If Developer A and Developer B edited the same application at the same time, they would overwrite each other's changes. Oracle introduced **Working Copies**. Developer A can now create a "Branch" (working copy) of the main app, build a new page in isolation, test it, and then visually merge it back into the Main App. It brings the power of Git-style branching directly into the low-code browser environment!

      ### 2. Native APEX Workflows
      Almost every enterprise app requires an approval process. In the past, developers had to build custom PL/SQL state machines and hidden tables to track this. APEX now features a visual, drag-and-drop **Workflow Builder**. You can define multi-step business processes, timeouts, and email notifications without writing a single line of backend logic.

      ### 3. APEX Generative AI Integrations
      AI is no longer a buzzword; it's an expectation. APEX makes it incredibly easy to integrate AI into your applications. Through declarative "Generative AI" dynamic actions, you can build an app where a user types a rough product description, and APEX automatically calls out to OCI Generative AI (or OpenAI) to summarize the text, translate it, or fix the grammar—no complex REST API coding required. Furthermore, the APEX builder itself now features an AI Assistant to help you write SQL queries and build pages using natural language!

      > **💡 Creator Tip:** Don't just read about this—go to [cloud.oracle.com](https://cloud.oracle.com), spin up a free Autonomous Database, and try these exact scripts today!
    `,
    author: 'APEX Specialist',
    date: 'Feb 28, 2026',
    category: 'APEX',
    image: '/apex-lowcode.png',
    tags: ['APEX', 'Low-Code', 'Generative AI', 'Workflow']
  },
  {
    id: '12',
    title: 'Real-Time Messaging in Oracle APEX: A Self-Hosted WebSocket Solution',
    excerpt: 'Bridge the gap between your Oracle Database and the browser with a dedicated Node.js WebSocket bus. Send messages from PL/SQL to any APEX page instantly.',
    content: `
      ## 🔍 Overview
      Handling real-time updates in Oracle APEX often leads to costly polling or complex third-party services. **APEX Real-Time Messaging (RTM)** is a small, self-hosted **real-time message bus** designed specifically for the Oracle stack.

      It provides a seamless bridge between your Oracle Database (using MLE JS) and your APEX application via a lightweight Node.js WebSocket server.

      ### What it gives you:
      - **Node.js WebSocket bridge** running on an Oracle Cloud Compute instance.
      - **3 APEX plug-ins**: Listener (Dynamic Action), Broadcast (Dynamic Action), and Broadcast (Process).
      - **DB-side MLE JavaScript module** + PL/SQL API (\`WEBSOCKET_API\`).
      - **Logging layer** to track every broadcast.

      ## 🧩 Architecture
      The architecture is designed for low latency and high reliability:

      \`\`\`text
      [ APEX Page (Browser) ]
          ▲           │ WebSocket (wss://rtm.yourdomain.com)
          │           │
          │   RTM – Listener (DA plugin)
          │           │
          │     JSON events: { channel, eventName, payload, ... }
          │
      [ Node.js RTM Server ]
          ▲   HTTP POST /api/broadcast
          │
          │  WEBSOCKET_API.broadcast_item(...)
          │
      [ Oracle DB (MLE JS) + PL/SQL ]
          ▲
      [ APEX Plug-ins: RTM – Broadcast (Process / DA) ]
      \`\`\`

      ## ⚙️ Getting Started: The RTM Server
      To get started, you'll need a small Oracle Cloud Compute instance (Oracle Linux 9 recommended).

      1. **Install Node.js & Nginx**: Use \`dnf\` to install the runtime and the reverse proxy.
      2. **Setup SSL**: Use Let's Encrypt and Certbot to secure your WebSocket connection (\`wss://\`).
      3. **Launch the Node Server**: A simple Express + \`ws\` application handles the message routing.

      ### Sample Broadcast API (Node.js)
      \`\`\`js
      app.post("/api/broadcast", (req, res) => {
        const { channel, eventName, payload } = req.body;
        const msg = JSON.stringify({ channel, eventName, payload });

        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
          }
        });
        res.json({ ok: true });
      });
      \`\`\`

      ## 🗃️ Database Integration (MLE)
      On the database side, we leverage **Multilingual Engine (MLE)** to perform the HTTP POST to the RTM server. This allows PL/SQL developers to trigger real-time updates directly from triggers, packages, or APEX processes.

      \`\`\`sql
      BEGIN
          websocket_api.broadcast(
              p_channel   => 'room_42',
              p_event_name => 'new_message',
              p_payload    => '{"text": "Hello World", "user": "Admin"}'
          );
      END;
      \`\`\`

      ## 🚀 Advanced Use Cases
      The beauty of RTM is its flexibility. Since you define the JSON payload, you can use it for:
      - **Group Chats**: Route messages based on room IDs.
      - **Background Jobs**: Notify users when a long-running process completes.
      - **Region Refresh**: Automatically trigger a Refresh Dynamic Action when data changes.
      - **Collaboration**: Synced state between multiple users on the same page.

      ## Get the Code
      The entire project is open-source and ready for your next project. Explore the repository, contribute, and build amazing real-time experiences.

      **Check it out on GitHub: [OracleUniverse/apex-realtime-messaging](https://github.com/OracleUniverse/apex-realtime-messaging)**
    `,
    author: 'Oracle Architect',
    date: 'Mar 10, 2025',
    category: 'APEX',
    image: '/Real-Time Messaging.png',
    tags: ['APEX', 'Real-time', 'WebSocket', 'Node.js', 'MLE', 'Cloud']
  },
  {
    id: '11',
    title: 'Designing an Enterprise-Grade Security and Standardization Architecture for Oracle APEX',
    excerpt: 'Oracle APEX is often perceived as a "rapid development" tool. This article walks through a production-ready standardization architecture focused on security, scalability, and compliance.',
    content: `
      ## Designing an Enterprise-Grade Security and Standardization Architecture for Oracle APEX

      Oracle APEX is often perceived as a “rapid development” tool. While that is true, many teams underestimate its ability to support enterprise-grade security, governance, and scalability when combined with proper Oracle Database design principles.

      In this article, I’ll walk through a production-ready standardization architecture for Oracle Database, PL/SQL, and Oracle APEX — the kind of architecture suitable for banks, government systems, large enterprises, and multi-branch applications.

      This is not a theoretical model. It is a battle-tested design approach focused on:
      - Security by design
      - Clear separation of responsibilities
      - Scalability and maintainability
      - Compliance and auditing

      ### 1. Architectural Philosophy

      The first principle is simple: **Oracle APEX should never be the security boundary. The database must always be the final authority.**

      **APEX is responsible for:**
      - UI rendering
      - User interaction
      - Page flow

      **The Oracle Database is responsible for:**
      - Data integrity
      - Authorization
      - Row-level security
      - Auditing
      - Business rules enforcement

      This separation ensures that data remains protected even if accessed outside APEX, security rules cannot be bypassed by ad-hoc SQL or UI mistakes, and the system remains consistent across REST APIs and integrations.

      ### 2. Schema Standardization (Separation of Duties)

      A common mistake in APEX projects is putting *everything* into one schema. Instead, an enterprise design separates responsibilities clearly.

      | Schema | Responsibility |
      | :--- | :--- |
      | **APEX_APP** | APEX application metadata + read-only synonyms |
      | **APP_DATA** | Tables, sequences, constraints |
      | **APP_API** | PL/SQL business logic and DML |
      | **APP_SEC** | Security, session context, RLS, auditing |
      | **APP_LOG** | Central logging and error tracking |
      | **APP_INT** | Integrations and REST services |

      **Why this matters:**
      - UI developers cannot bypass security logic
      - Business rules are reusable (APEX, REST, batch jobs)
      - Auditing and monitoring are centralized
      - Each layer has a single, clear responsibility

      ### 3. The Role of the APEX Parsing Schema

      The **APEX_APP** schema has a very specific purpose: It exists only to **run APEX pages**, not to own data or logic.

      It should contain APEX application definitions and read-only synonyms. It must **NOT** contain tables, DML logic, or security decisions. It should never have \`INSERT\`, \`UPDATE\`, or \`DELETE\` privileges on data tables. Instead, it only executes controlled APIs.

      ### 4. User Model: APEX Users ≠ Database Users

      In enterprise APEX systems: **End users are application users, not database users.**

      Using one DB user per APEX user breaks connection pooling, increases complexity, and does not scale.

      **Correct Approach:**
      Users are stored in application tables (\`APP_USERS\`, \`APP_ROLES\`). APEX authenticates the user, then the database is informed of who the user is logically, not physically.

      ### 5. Session Context: The Foundation of Security

      Oracle provides **Application Contexts** to store user identity at session level.

      This context is set **once**, immediately after login:

      \`\`\`sql
      DBMS_SESSION.SET_CONTEXT('APP_CTX','USER_ID', v_user_id);
      DBMS_SESSION.SET_CONTEXT('APP_CTX','BRANCH_ID', v_branch_id);
      DBMS_SESSION.SET_CONTEXT('APP_CTX','ROLES', v_roles);
      \`\`\`

      From this point on, the database *knows* who the user is.

      ### 6. Row-Level Security (RLS / VPD)

      Row-Level Security ensures users only see **the data they are allowed to see**, regardless of how the query is written.

      Instead of writing \`WHERE branch_id = :P_BRANCH_ID\` in every SQL query, we enforce it centrally using a **VPD policy**:

      \`\`\`sql
      RETURN 'BRANCH_ID = ' || SYS_CONTEXT('APP_CTX','BRANCH_ID');
      \`\`\`

      **Benefits:**
      - No SQL duplication
      - No accidental data leakage
      - Works automatically for APEX, REST services, Reports, and SQL Developer.

      ### 7. Business Logic and DML Standardization

      **Standard Rule: APEX never performs DML directly.**

      Instead, APEX calls \`APP_API\` packages. These packages validate input, apply business rules, perform DML, handle exceptions, and log errors. This ensures consistency, auditability, and reusability.

      ### 8. Exception Handling and Logging

      Every exception is captured centrally. Instead of letting errors disappear in the UI, errors are logged with User ID, Module, Stack trace, and Timestamp. This dramatically improves debugging, support, and compliance.

      ### 9. Auditing with Fine-Grained Auditing (FGA)

      Some data deserves **extra visibility** (e.g., Salaries, VIP records). Fine-Grained Auditing records who accessed the data, when, from where, and which query was used. Even read-only access can be audited, which is critical for GDPR, HIPAA, and SOX compliance.

      ### 10. APEX-Specific Best Practices

      1.  **No Ad-Hoc SQL in Pages**: SQL should come from Views or APIs, not directly embedded in regions.
      2.  **Authorization Schemes**: UI visibility should be driven by central authorization functions and shared role logic, not hard-coded role checks.

      ### Final Thoughts

      Oracle APEX is not a “toy” platform. When combined with proper database architecture, context-based security, row-level policies, and centralized business logic, it becomes a **powerful enterprise application platform** capable of handling multi-branch systems, multi-tenant SaaS, and high-security environments.

      The key is discipline and design — not speed alone.
    `,
    author: 'Principal Architect',
    date: 'Mar 05, 2025',
    category: 'APEX',
    image: '/Security and Standardization Architecture.jpeg',
    tags: ['APEX', 'Security', 'Architecture', 'Enterprise', 'VPD', 'RLS']
  },
  {
    id: '10',
    title: 'Supercharge Oracle APEX with the New Tree Select Plugin',
    excerpt: 'A native, high-performance page item plugin for selecting hierarchical data with ease. Say goodbye to complex JavaScript workarounds.',
    content: `
      ## The Missing Piece in APEX
      Handling hierarchical data in Oracle APEX forms has historically been challenging. While the standard Tree region is powerful, form inputs often require a dropdown-style tree selection mechanism—something that isn't built-in natively.

      Enter **APEX Tree Select**.

      ### Key Features
      This open-source plugin bridges the gap, offering a robust set of features designed for enterprise applications:

      1. **Native Page Item**: Works seamlessly with Dynamic Actions, Validations, and Session State.
      2. **Searchable**: Built-in filtering allows users to find deep nodes instantly.
      3. **Multi-Select**: Support for checkboxes to select multiple nodes at once.
      4. **Lazy Loading**: Optimized for large datasets; load children only when expanded.

      ### How to Use It
      Installing the plugin is standard. Import the SQL file into your application, and you are ready to go.

      ### Data Source Configuration
      The plugin expects a standard SQL query returning hierarchical data. You simply map the columns in the Page Designer.

      \`\`\`sql
      SELECT 
          emp_id    AS id, 
          mgr_id    AS parent_id,
          last_name AS label,
          'fa fa-user' AS icon
      FROM employees
      CONNECT BY PRIOR emp_id = mgr_id
      START WITH mgr_id IS NULL
      ORDER SIBLINGS BY last_name;
      \`\`\`

      ### JSON Support
      For modern applications, you can also bind it to a JSON returning function, making it perfect for REST Data Sources or \`apex_json\` output.

      ### Get It Now
      The project is open-source and available on GitHub. Contribute, fork, or just use it to make your users happy.

      Check out the repository: **[OracleUniverse/apex-tree-select](https://github.com/OracleUniverse/apex-tree-select)**
    `,
    author: 'Plugin Developer',
    date: 'Feb 24, 2025',
    category: 'APEX',
    image: '/Tree Select Plugin.png',
    tags: ['APEX', 'Plugin', 'UI/UX', 'Open Source']
  },
  {
    id: '9',
    title: 'Mastering Oracle Database 26ai: A Deep Dive into AI Vector Search for Enterprise',
    excerpt: 'Oracle Database 26ai represents a fundamental shift in how we manage enterprise data. It is not just about storing rows and columns anymore; it is about storing meaning.',
    content: `
      ## 1. Understanding the Core: What is a Vector Embedding?
      To a computer, the word "Invoice" and the word "Bill" are completely different. They share no common letters. Traditional databases use keyword matching (e.g., \`WHERE text LIKE '%Invoice%'\`), which means if a user searches for "Bill," they miss the result for "Invoice."
      
      **Vector Embeddings** solve this problem.

      ### The Number Representation
      A vector is simply a long list of numbers, for example:
      \`[0.015, -0.234, 0.881, ...]\`
      
      Think of these numbers as **coordinates on a map**.
      - Imagine a 2D map. "Apple" is at coordinate [10, 10]. "Orange" is at [11, 11]. "Bicycle" is far away at [50, 90].
      - Because "Apple" and "Orange" are mathematically close to each other on the map, the computer understands they are related, even though the words look nothing alike.

      ### Why is this the "Best" Representation?
      Vectors are currently the state-of-the-art representation for unstructured data because they capture **Semantic Meaning** rather than syntax.
      1. **Context Awareness**: In the sentence "The crane flew away," the vector for "crane" will look different than in the sentence "The crane lifted the steel beam."
      2. **Dimensionality**: Modern models (like GPT-4 or Cohere) don't just use 2 dimensions (X and Y). They use hundreds or thousands (e.g., 1536 dimensions). This allows the vector to capture complex nuances—tone, subject, urgency, language, and intent—all within that single array of numbers.

      ### How are the "Rules" Created?
      You might ask: *Who decides that 'Apple' gets the number 0.015?*
      
      There are no manual rules or "if/then" statements. These numbers are generated by a **Neural Network** (an Embedding Model) that has been trained on billions of lines of text. During training, the model learns that "King" and "Queen" often appear in similar contexts, just as "Man" and "Woman" do.
      
      The model adjusts the numbers (weights) until the mathematical distance between "King" minus "Man" plus "Woman" equals "Queen." When you convert your business data to vectors, you are leveraging this massive, pre-learned intelligence.

      ## 2. Generating Vectors in Oracle Database 26ai
      One of the strongest features of Oracle 26ai is flexibility. You do not need to rely on a single method to turn your text into numbers. Oracle provides three distinct architectural paths to generate these vectors:

      ### A. In-Database Embedding (ONNX)
      This is the most secure and high-performance option. You can import pre-trained embedding models (like open-source Hugging Face models) in the ONNX (Open Neural Network Exchange) format directly into the Oracle Database kernel.
      - **Benefit**: Data never leaves your database.
      - **Performance**: Zero network latency because the vector generation happens locally on the database server hardware.

      ### B. External REST Providers
      If you want to use state-of-the-art models from major AI labs, Oracle 26ai has native integration to call third-party embedding services via REST APIs.
      - **Supported Providers**: OpenAI, Cohere, Google AI, Hugging Face, and Vertex AI.
      - **Benefit**: You get access to the "smartest" models without managing the model infrastructure yourself.

      ### C. Local REST Providers (e.g., Ollama)
      This is a hybrid approach. You can run open-source models (like nomic-embed-text or llama3) on your own infrastructure (using tools like Ollama) and connect Oracle to them.
      - **Benefit**: Combines the privacy of local hosting with the flexibility of open-source models, accessed via SQL.

      ## 3. Business Use Case: Intelligent IT Support Search
      Let’s apply this to a real-world scenario. Imagine we are building a search tool for an IT Support Ticket system.
      - **Problem**: A user types "My screen is black."
      - **Database Data**: The solution is titled "Display Output Failure."
      - **Goal**: The database should know these are the same thing.

      ### Step 1: Create the Table with VECTOR Data Type
      In Oracle 26ai, VECTOR is a native data type, just like VARCHAR or DATE.

      \`\`\`sql
      CREATE TABLE it_knowledge_base (
        kb_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        issue_title VARCHAR2(200),
        solution CLOB,
        -- We define a vector column. 
        -- 384 is a common dimension size for smaller, efficient models.
        v_embedding VECTOR(384, FLOAT32)
      );
      \`\`\`

      ### Step 2: Insert Data and Generate Vectors
      In a production environment, you can automate vector generation using triggers or chainable calls. Here, we simulate generating the vector using an embedding model (represented conceptually here as UTL_TO_EMBEDDING) during the insert.
      
      *Note: In this example, we assume the database is configured to use a local ONNX model named 'my_onnx_model'.*

      \`\`\`sql
      INSERT INTO it_knowledge_base (issue_title, solution, v_embedding)
      VALUES (
        'Display Output Failure',
        'Check HDMI cables and ensure the monitor power cycle is complete.',
        TO_VECTOR(VECTOR_EMBEDDING(model => 'my_onnx_model', content => 'Display Output Failure'))
      );

      INSERT INTO it_knowledge_base (issue_title, solution, v_embedding)
      VALUES (
        'VPN Connection Timeout',
        'Reset your RSA token and clear the network cache.',
        TO_VECTOR(VECTOR_EMBEDDING(model => 'my_onnx_model', content => 'VPN Connection Timeout'))
      );
      
      COMMIT;
      \`\`\`

      ### Step 3: Performing the Similarity Search
      Now, a user searches for "My screen is black."
      We convert the user's search text into a vector on the fly and compare it to our stored vectors using VECTOR_DISTANCE.

      \`\`\`sql
      SELECT issue_title, 
             solution, 
             -- Calculate how close the search phrase is to the stored title
             VECTOR_DISTANCE(
               v_embedding, 
               VECTOR_EMBEDDING(model => 'my_onnx_model', content => 'My screen is black'), 
               COSINE
             ) AS similarity_score
      FROM it_knowledge_base
      ORDER BY similarity_score
      FETCH FIRST 1 ROWS ONLY;
      \`\`\`

      ### The Result
      Even though the user typed "Black screen" and the database contained "Display Output Failure," the **Cosine Similarity** calculation will determine that these two vectors point in nearly the same direction in the mathematical space.
      The query will return the "Display Output Failure" record, solving the user's problem without requiring exact keyword matching.

      ## Summary
      Oracle Database 26ai transforms the database from a passive container of text into an active engine of intelligence. By understanding that **Vectors** are simply mathematical coordinates of meaning, and leveraging Oracle's ability to generate these vectors via **ONNX**, **External APIs**, or **Local tools**, developers can build powerful semantic search applications entirely within SQL.
    `,
    author: 'AI Architect',
    date: 'Feb 20, 2025',
    category: 'Database',
    image: '/Vector Search.png',
    tags: ['AI', 'Vector Search', '26ai', 'Oracle']
  },
  {
    id: '1',
    title: 'Optimizing SQL Queries in Oracle 23ai & 26ai',
    excerpt: "Optimizing an Oracle database is no longer just about adding indexes; it's about utilizing next-generation architecture, AI-driven plan management, and eliminating developer bottlenecks.",
    content: `
      ## 📝 Introduction
      For decades, optimizing an Oracle database meant staring at a massive, confusing Execution Plan, trying to figure out why the database chose a "Full Table Scan" instead of an "Index Range Scan," and adding hidden \`/*+ HINTS */\` into your code.

      With the release of **Oracle 23ai** and the cutting-edge **Oracle 26ai**, the database has become *smart*. Performance tuning is no longer just about adding indexes; it is about utilizing next-generation architecture, AI-driven plan management, and eliminating developer bottlenecks.

      Here are the top 5 ways to optimize your SQL queries and application performance in modern Oracle databases.

      ### 1. Eliminate Context Switching with "SQL Macros"
      **The Performance Killer:** Developers love writing PL/SQL functions to encapsulate business logic. But when you call a PL/SQL function inside a standard SQL \`SELECT\` statement that returns 1 million rows, the database engine has to switch between the SQL engine and the PL/SQL engine 1 million times. This is called a **Context Switch**, and it is brutally slow.

      **The 23ai/26ai Fix: SQL Macros.** Oracle introduced SQL Macros to solve this. When you tag a function as a \`SQL_MACRO\`, Oracle doesn't run it row-by-row. Instead, at compile time, it takes the logic *inside* your function and dynamically injects it directly into your SQL query.

      **🚫 The Old Way (Slow due to context switching):**
      \`\`\`sql
      CREATE OR REPLACE FUNCTION get_total (price NUMBER) RETURN NUMBER IS
      BEGIN
          RETURN price * 1.15; -- Adds 15% tax
      END;
      /
      -- Runs the PL/SQL engine 1,000,000 times!
      SELECT get_total(price) FROM massive_sales_table;
      \`\`\`

      **✅ The Modern Way (Lightning Fast SQL Macro):**
      \`\`\`sql
      CREATE OR REPLACE FUNCTION get_total_macro (price NUMBER) 
      RETURN VARCHAR2 SQL_MACRO IS
      BEGIN
          RETURN 'price * 1.15'; -- Returns the actual SQL text!
      END;
      /
      -- The DB rewrites this behind the scenes as: SELECT price * 1.15 FROM massive_sales_table;
      -- Zero context switches!
      SELECT get_total_macro(price) FROM massive_sales_table;
      \`\`\`

      ### 2. Replace Redis with "Oracle True Cache"
      **The Performance Killer:** When an application runs the same read-heavy query thousands of times a second, hitting the main database is too heavy. Developers usually fix this by adding a middle-tier cache like Redis. But this means developers have to manually write code to keep Redis and Oracle in sync, leading to stale data bugs.

      **The 23ai Fix: True Cache.** Oracle 23ai introduced **True Cache**, an in-memory, diskless cache that sits in front of your database. It automatically syncs with your primary database in real-time. It requires **zero application code changes**. You simply tell your app's database driver to route "Read-Only" queries to the True Cache. You get Redis-level speed with Oracle-level consistency.

      ### 3. AI-Driven Real-Time SQL Plan Management (26ai)
      **The Performance Killer:** "Plan Regression" is a DBA's worst nightmare. A query that has been running in 0.1 seconds suddenly takes 30 seconds because the internal optimizer randomly chose a new, inefficient Execution Plan.

      **The 26ai Fix: Autonomous Self-Healing.** In Oracle 26ai, the database acts as its own DBA. Using AI and high-frequency background statistics, the database actively monitors query execution times. If it detects a SQL query suddenly slowed down, it will **automatically and instantly quarantine the bad plan**, test it in the background, and roll back to the previously known good plan.

      ### 4. Vector Indexes for Lightning-Fast AI Queries
      **The Performance Killer:** With Generative AI, developers store text, images, and documents as "Vectors". Running a mathematical similarity search across millions of rows requires calculating the distance between massive arrays of numbers. A standard B-Tree index cannot handle this; it requires a full table scan.

      **The 23ai/26ai Fix: HNSW Vector Indexes.** Oracle introduced specialized indexes specifically for AI workloads. By creating an Inverted File Flat (IVF) or Hierarchical Navigable Small World (HNSW) index, you reduce AI similarity search times from minutes to milliseconds.

      **✅ The Modern Way:**
      \`\`\`sql
      -- Create an AI index that groups similar vectors into "neighborhoods"
      CREATE VECTOR INDEX my_ai_docs_idx 
      ON company_documents (document_vector)
      ORGANIZATION NEIGHBORHOOD GRAPH (
          DISTANCE COSINE
          WITH TARGET ACCURACY 95
      );

      -- Instantly find the top 5 most relevant documents to the user's search
      SELECT document_name 
      FROM company_documents
      ORDER BY VECTOR_DISTANCE(document_vector, :user_search_vector, COSINE)
      FETCH FIRST 5 ROWS ONLY;
      \`\`\`

      ### 5. Stop Joining 10 Tables: Use JSON Relational Duality
      **The Performance Killer:** Fetching complex business objects (Order, Customer, Products, Address) requires joining 5 to 10 massive tables. Deeply nested joins are computationally expensive and slow down REST APIs.

      **The 23ai Fix: Duality Views.** Instead of running a massive 10-table join every time, you create a **JSON Relational Duality View**. The database pre-assembles the relational data into a high-performance JSON document format. When your application queries the view, Oracle fetches the complete hierarchical JSON document in a single, hyper-optimized read operation.

      **✅ The Modern Way:**
      \`\`\`sql
      -- The app simply fetches the document by ID. 
      -- No JOINs required! Fast, clean, and highly optimized.
      SELECT data 
      FROM order_duality_view 
      WHERE json_value(data, '$.order_id') = 1005;
      \`\`\`

      ---
      ### 🎓 Summary for Developers & DBAs
      Optimizing Oracle is no longer about blindly throwing B-Tree indexes at slow queries.

      1. Use **SQL Macros** to stop PL/SQL context switching.
      2. Let the DB handle caching with **True Cache**.
      3. Rely on **26ai's Autonomous Optimizer** to catch plan regressions.
      4. Use **Vector Indexes** for AI data.
      5. Use **Duality Views** to stop joining 10 tables for a simple API request.

      > **💡 Instructor Challenge:** Don't take my word for it. Open your Oracle Cloud Always Free tier, write a standard PL/SQL function inside a 1-million row SELECT statement, time it, and then rewrite it as a \`SQL_MACRO\`. You will be shocked by the speed difference!
    `,
    author: 'Oracle Performance Master',
    date: 'Feb 28, 2026',
    category: 'SQL',
    image: '/sql-optimization-26ai.png',
    tags: ['SQL', '23ai', '26ai', 'Performance', 'AI']
  },
  {
    id: '2',
    title: 'Getting Started with OCI Autonomous Database',
    excerpt: 'Cloud Architecture & Deployment: From Zero to Cloud – Learn to deploy, scale, and manage your first Autonomous Database in 60 seconds.',
    content: `
      ## ☁️ From Zero to Cloud: Getting Started with OCI Autonomous Database
      
      **Introduction**
      Ten years ago, if a developer or student wanted to learn Oracle Database, they had to clear 10GB of hard drive space, download massive ZIP files, configure memory parameters, and spend hours just trying to get the database installed. By the time it was running, half their energy was gone.

      Today, that entire process takes **60 seconds** in your web browser.

      Welcome to the **Oracle Cloud Infrastructure (OCI) Autonomous Database (ADB)**. Whether you are a student learning SQL, a developer building an APEX application, or a DBA transitioning to cloud architecture, the Autonomous Database is your new home. Let’s break down what it is, why it’s a game-changer, and how to get started.

      ### 1. What exactly does "Autonomous" mean?
      In the past, DBAs spent 80% of their time "keeping the lights on"—applying security patches, configuring backups, and tuning memory. The Autonomous Database is **"Self-Driving, Self-Securing, and Self-Repairing."**

      - **Self-Driving:** It automatically tunes its own performance, builds its own indexes based on your query habits, and scales its CPU up or down automatically based on traffic.
      - **Self-Securing:** It encrypts all data by default (at rest and in transit) and automatically applies security patches with zero downtime.
      - **Self-Repairing:** It runs on Oracle's Exadata cloud infrastructure. If a server rack fails, the database instantly fails over to another node. You won't even notice.

      ### 2. Choose Your Flavor: ATP vs. ADW
      When you click "Create Autonomous Database" in the Oracle Cloud Console, you will be asked to choose a workload type. It's crucial to understand the difference:

      - **ATP (Autonomous Transaction Processing):** This is for day-to-day applications. If you are building an e-commerce store, a Node.js web app, an APEX application, or a REST API, you want ATP. It is optimized for high-speed, concurrent, single-row inserts and updates.
      - **ADW (Autonomous Data Warehouse):** This is for analytics, reporting, and Machine Learning. If you are loading 500 million rows of historical sales data and running massive \`GROUP BY\` dashboard queries, you want ADW. It automatically compresses data and processes queries in massive parallel batches.
      - **JSON & APEX Workloads:** OCI also offers instances strictly locked down just for APEX low-code development or MongoDB-style JSON document stores.

      ### 3. The End of TNSNAMES.ORA (Connecting Securely)
      **The Problem:** Historically, connecting an application to an Oracle Database required installing the heavy Oracle Client on your machine and configuring a confusing file called \`tnsnames.ora\`.

      **The Cloud Fix:** Autonomous Database uses standard internet security. With recent updates, ADB supports TLS connections without a Wallet, meaning you can connect using a standard connection string (just a username, password, and URL) like you would with PostgreSQL or MySQL!

      **✅ The Modern Way:**
      1. You can download a **Wallet** (a small ZIP file containing SSL certificates) from the OCI Console.
      2. You point your modern Python, Node.js, or Java application directly to that ZIP file.
      3. *Even better:* You can now completely skip the wallet and use standard one-way TLS connection strings!

      ### 4. Database Actions: The Browser is Your IDE
      One of the best features for learners is **Database Actions** (formerly SQL Developer Web).

      You do not need to download or install any software (like DBeaver or SQL Developer) to your local computer. Autonomous Database includes a fully-featured, built-in web suite. Right from your browser, you can:
      - Write and run SQL and PL/SQL scripts.
      - Drag and drop Excel spreadsheets to automatically create and populate tables.
      - Build REST APIs visually.
      - Monitor performance and view execution plans.
      - Manage JSON Duality Views.

      ### 5. Chat with Your Data using "Select AI"
      Because ADB is deeply integrated with Oracle's cloud infrastructure and large language models (LLMs), it includes a mind-blowing feature for modern developers called **Select AI**.

      Instead of writing complex SQL queries to analyze your data, you can ask the database questions in plain English. The database translates your natural language into a highly optimized SQL query, runs it, and returns the data.

      **✅ The Modern Way (Run this directly in your SQL worksheet):**
      \`\`\`sql
      -- 1. Configure an AI profile linking your database to OCI Generative AI or OpenAI
      EXEC DBMS_CLOUD_AI.CREATE_PROFILE('my_ai', ...);

      -- 2. Simply ask the database a question!
      SELECT AI Run a report showing the top 5 highest selling products in the state of New York last month;
      \`\`\`
      *The database automatically figures out which tables to join and returns the exact rows!*

      ---

      ### 🎓 Step-by-Step: Your First 60-Second Setup
      Ready to start? Here is your homework assignment:

      1. Go to [oracle.com/cloud/free](https://www.oracle.com/cloud/free/) and sign up for an "Always Free" account. (It requires a credit card to verify you are a human, but it will *never* charge you unless you manually upgrade).
      2. Log into the OCI Console, click the hamburger menu, and select **Autonomous Database**.
      3. Click **Create Autonomous Database**.
      4. Give it a name (e.g., \`LearnDB\`), choose **Transaction Processing (ATP)**, and toggle the switch that says **Always Free**.
      5. Create a strong Admin password and click Create.
      6. *Wait 60 seconds.* Once the square turns green, click **Database Actions -> SQL**.
      7. Write \`SELECT 'Hello Cloud';\` and hit run. You are officially an Oracle Cloud Developer!
    `,
    author: 'Cloud Architect',
    date: 'Mar 01, 2026',
    category: 'Cloud',
    image: '/Autonomous DB.jpg',
    tags: ['Cloud', 'OCI', 'Autonomous']
  },
  {
    id: '3',
    title: 'Advanced PL/SQL Patterns for Modern Apps',
    excerpt: 'Enterprise Backend Development: Master Bulk Processing, Native JSON, and REST Integration to build high-performance Oracle backends.',
    content: `
      ## ⚡ Advanced PL/SQL Patterns for Modern Apps
      
      **Introduction**
      There is a myth in modern web development that database stored procedures are "dead" and that all business logic should be written in Python, Node.js, or Java. However, pulling millions of rows out of a database, across a network, just to process them in a middle tier is a recipe for slow applications.

      PL/SQL is still the fastest way to process data because the logic runs *exactly where the data lives*. With Oracle 23ai and 26ai, PL/SQL has evolved. It natively speaks JSON, integrates with REST APIs, and even runs JavaScript. Here are the advanced PL/SQL patterns you need to build fast, modern backends.

      ### 1. Stop Looping Row-by-Row: BULK COLLECT & FORALL
      **The Performance Killer:** The most common mistake junior developers make in PL/SQL is writing a \`FOR\` loop to update or insert records one at a time. This causes a "Context Switch" between the PL/SQL engine and the SQL engine for every single row. If you process 10,000 rows, that's 10,000 context switches.

      **The Modern Fix: Bulk Processing.** Use \`BULK COLLECT\` to read data into memory arrays all at once, and \`FORALL\` to write the data back to the database in one massive batch operation.
      
      **🚫 The Old Way (Slow row-by-row processing):**
      \`\`\`sql
      FOR r IN (SELECT emp_id, salary FROM employees) LOOP
          UPDATE employees SET salary = r.salary * 1.1 WHERE emp_id = r.emp_id;
      END LOOP;
      \`\`\`

      **✅ The Modern Way (Lightning Fast Bulk Processing):**
      \`\`\`sql
      DECLARE
          TYPE t_emp_ids IS TABLE OF employees.emp_id%TYPE;
          v_emp_ids t_emp_ids;
      BEGIN
          -- Read all IDs into memory instantly
          SELECT emp_id BULK COLLECT INTO v_emp_ids FROM employees;
          
          -- Update all rows in one single SQL engine call
          FORALL i IN 1..v_emp_ids.COUNT
              UPDATE employees SET salary = salary * 1.1 WHERE emp_id = v_emp_ids(i);
      END;
      \`\`\`

      ### 2. Native JSON Object Processing
      **The Problem:** Modern frontends (React, Angular) communicate via JSON REST APIs. Historically, developers tried to build JSON responses in PL/SQL by concatenating strings (e.g., \`'{"name": "' || v_name || '"}'\`), which resulted in formatting errors and SQL injection vulnerabilities.

      **The Fix: PL/SQL Native JSON Types.** Oracle provides built-in object types like \`JSON_OBJECT_T\` and \`JSON_ARRAY_T\` that allow you to interact with JSON in PL/SQL exactly like you would in JavaScript.
      
      **✅ The Modern Way:**
      \`\`\`sql
      DECLARE
          v_json   JSON_OBJECT_T := JSON_OBJECT_T();
          v_array  JSON_ARRAY_T  := JSON_ARRAY_T();
      BEGIN
          -- Dynamically build a secure JSON document
          v_json.put('status', 'success');
          v_json.put('user_id', 101);
          
          v_array.append('Admin');
          v_array.append('Developer');
          v_json.put('roles', v_array);
          
          -- Output: {"status":"success","user_id":101,"roles":["Admin","Developer"]}
          DBMS_OUTPUT.PUT_LINE(v_json.to_string);
      END;
      \`\`\`

      ### 3. Zero-Downtime Deployments with EBR
      **The Problem:** In modern CI/CD (Continuous Integration/Continuous Deployment), releasing new application features requires updating PL/SQL packages. But if you try to \`CREATE OR REPLACE PACKAGE\` while thousands of users are logged in, their sessions will crash with "package state discarded" errors. Apps had to schedule weekend downtime just to deploy code.

      **The Fix: Edition-Based Redefinition (EBR).** EBR allows you to have two versions of your PL/SQL code living in the database *at the exact same time*. 

      Version 1 (The old code) runs for existing users. Meanwhile, your CI/CD pipeline deploys Version 2 (The new code) into a hidden "Edition" in the background. Once Version 2 is fully compiled and tested, the DBA simply flips a switch, and all new users are routed to Version 2. **Zero downtime, zero weekend deployments.**

      ### 4. Mixing PL/SQL with JavaScript (MLE)
      **The Problem:** PL/SQL is amazing for data manipulation, but it is terrible at tasks like complex regex string parsing, cryptography, or formatting specific API payloads. 

      **The Fix: Multilingual Engine (MLE).** Instead of writing a 500-line PL/SQL workaround, you can invoke JavaScript modules directly from inside your PL/SQL blocks using the \`DBMS_MLE\` package or native MLE callouts.

      **✅ The Modern Way:**
      \`\`\`sql
      -- Define an MLE JavaScript function
      CREATE OR REPLACE MLE MODULE email_validator LANGUAGE JAVASCRIPT AS
      export function isValidEmail(email) {
          const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
          return regex.test(email);
      }
      /

      -- Use it directly in PL/SQL!
      DECLARE
          v_is_valid BOOLEAN;
      BEGIN
          -- Calling the JavaScript module directly
          v_is_valid := email_validator.isValidEmail('test@oracle.com');
          
          IF v_is_valid THEN
              DBMS_OUTPUT.PUT_LINE('Valid Email!');
          END IF;
      END;
      \`\`\`

      ### 5. Auto-REST: Turn Packages into APIs Instantly
      **The Problem:** You wrote a brilliant PL/SQL package that calculates employee bonuses. Now, the React Native mobile app developer says, *"Great, can you give me a REST API endpoint so I can call it?"* In the past, you had to spin up a Node.js or Java Spring Boot server just to wrap your PL/SQL code in a REST API.

      **The Fix: Oracle REST Data Services (ORDS).** You can expose any PL/SQL procedure as a secure web API endpoint with a single command.

      **✅ The Modern Way:**
      \`\`\`sql
      -- This single command turns your PL/SQL package into a REST API!
      BEGIN
          ORDS.ENABLE_OBJECT(
              p_enabled      => TRUE,
              p_schema       => 'HR',
              p_object       => 'PAYROLL_PKG',
              p_object_type  => 'PACKAGE',
              p_object_alias => 'payroll'
          );
      END;
      -- Now the frontend dev can just POST to: https://your-db.oraclecloud.com/ords/hr/payroll/calculate_bonus
      \`\`\`

      ---
      ### 🎓 Summary for Enterprise Developers
      Modern PL/SQL is no longer just about writing database triggers. By mastering **Bulk Processing, native JSON integration, MLE (JavaScript), and ORDS**, you transform PL/SQL from a legacy data tool into a high-performance backend application server.

      > **💡 Instructor Challenge:** Take an old PL/SQL procedure you have that loops through rows and concatenates a string. Rewrite it using \`BULK COLLECT\` and the \`JSON_ARRAY_T\` object. Compare the execution times. You will never go back to string concatenation!
    `,
    author: 'PL/SQL Architect',
    date: 'Mar 01, 2026',
    category: 'PL/SQL',
    image: '/plsql_patterns.png',
    tags: ['PL/SQL', 'Development', 'Performance', 'JSON', 'MLE']
  },
  {
    id: '4',
    title: '💛 JavaScript Everywhere: Oracle APEX & DB 23ai/26ai',
    excerpt: 'Full-Stack Engineering: Master the Multilingual Engine (MLE) and use JavaScript natively inside Oracle Database and APEX backend processes.',
    content: `
      ## 💛 JavaScript Everywhere: Oracle APEX & DB 23ai/26ai

      **Introduction**
      For decades, the line was clearly drawn: JavaScript was for the frontend (the browser), and PL/SQL was for the backend (the database). If you wanted to process 1 million rows of data using a specialized JavaScript library, you had to extract that data across the network to a Node.js server, process it, and send it back. It was slow and inefficient.

      Today, that boundary has vanished. With the **Multilingual Engine (MLE)** powered by GraalVM inside Oracle Database 23ai and 26ai, the V8 JavaScript engine now runs natively *inside the database kernel*. Furthermore, Oracle APEX has deeply integrated JavaScript into both its front and back ends.

      Whether you are a React developer learning Oracle or an old-school DBA adapting to the modern web, here is how you use JavaScript in the Oracle ecosystem.

      ### 1. Database Server-Side: Inline JavaScript Functions
      **The Problem:** You need to write a complex string-parsing algorithm or a mathematical calculation. Doing this in PL/SQL can be verbose, but doing it in JavaScript is incredibly easy.

      **The Fix: MLE Inline Functions.** In Oracle 23ai+, you can create standard database functions but write the logic entirely in JavaScript. You can even call these JavaScript functions directly in your standard SQL \`SELECT\` statements.

      **✅ The Modern Way:**
      \`\`\`sql
      CREATE OR REPLACE FUNCTION calc_discount(price NUMBER, discount NUMBER) 
      RETURN NUMBER 
      AS MLE LANGUAGE JAVASCRIPT
      q'[
          // Pure JavaScript running inside the database!
          if (price < 0) return 0;
          return price - (price * (discount / 100));
      ]';
      /

      -- Call the JavaScript function from standard SQL
      SELECT product_name, calc_discount(price, 20) AS sale_price 
      FROM products;
      \`\`\`

      ### 2. Database Server-Side: Importing NPM Packages
      **The Problem:** You need to validate complex data (like checking if an email is valid, or parsing a complex URL). Why write 500 lines of custom PL/SQL when the open-source community already built the perfect NPM package for it?

      **The Fix: MLE Modules.** You can load popular open-source JavaScript libraries (like \`validator.js\` or \`marked.js\`) directly into the Oracle Database as an "MLE Module" and use them to process your relational tables.

      **✅ The Modern Way:**
      1. Load the JavaScript code into an MLE Module in the database.
      2. Create a PL/SQL wrapper to expose it to SQL.
      3. Use the world's best JS libraries to validate your database rows instantly without network latency!

      ### 3. APEX Server-Side: Backend Logic without PL/SQL
      **The Problem:** A new developer joins your Oracle APEX team. They know JavaScript perfectly, but they have never seen PL/SQL. In older APEX versions, they couldn't write any backend Page Processes or validations.

      **The Fix: APEX Server-Side JavaScript.** When creating a Process or Validation in APEX, you can now change the language dropdown from *"PL/SQL"* to *"JavaScript (MLE)"*. You have full access to APEX session state and the database.

      **✅ The Modern Way (APEX Page Process):**
      \`\`\`javascript
      // 1. Read APEX Page Items using the apex.env object
      let currentSalary = apex.env.P1_SALARY;

      // 2. Perform JS business logic
      let bonus = currentSalary * 0.15;

      // 3. Set an APEX Page Item
      apex.env.P1_BONUS = bonus;

      // 4. Run SQL directly from JavaScript!
      let result = apex.conn.execute(
          "SELECT first_name FROM employees WHERE emp_id = :id", 
          { id: apex.env.P1_EMP_ID }
      );
      console.log("Processed bonus for: " + result.rows[0].FIRST_NAME);
      \`\`\`

      ### 4. APEX Client-Side: Mastering the APEX JS API
      **The Problem:** APEX's visual "Dynamic Actions" are great for beginners (e.g., "Show Region when Button Clicked"). But for complex UIs, creating 20 overlapping Dynamic Actions makes the page unmaintainable and slow.

      **The Fix: The \`apex.*\` JavaScript Namespace.** Professional APEX developers use Oracle's highly optimized client-side JavaScript API to manipulate the DOM, show notifications, and make asynchronous AJAX calls without reloading the page.

      **✅ The Modern Way (Client-Side AJAX call):**
      \`\`\`javascript
      // Call an APEX "Application Process" asynchronously
      apex.server.process("GET_CUSTOMER_DETAILS", 
          {
              // Pass the value of Page Item P2_CUST_ID to the server
              x01: apex.item("P2_CUST_ID").getValue()
          }, 
          {
              success: function(data) {
                  // Update the UI instantly without refreshing the page
                  apex.item("P2_COMPANY_NAME").setValue(data.company_name);
                  
                  // Show a beautiful native APEX toast notification
                  apex.message.showPageSuccess("Customer data loaded via AJAX!");
              },
              dataType: "json"
          }
      );
      \`\`\`

      ---
      ### 🎓 Summary for Full-Stack Developers
      JavaScript is no longer an "outside" language in the Oracle world. It is a first-class citizen. 
      - Use **MLE Inline Functions** to write math/logic in JS instead of PL/SQL.
      - Use **MLE Modules** to bring NPM packages into your database.
      - Use **Server-Side APEX JS** to let web developers build backends instantly.
      - Use the **APEX Client JS API** to build snappy, modern, AJAX-driven web apps.

      > **💡 Instructor Challenge:** Open your APEX Workspace. Create a new Page Process, but set the language to **JavaScript (MLE)**. Use \`apex.conn.execute()\` to update a table, and then print a success message to the console. Welcome to the future of Oracle development!
    `,
    author: 'Full-Stack Developer',
    date: 'Mar 01, 2026',
    category: 'Javascript',
    image: '/javascript_everywhere.png',
    tags: ['JavaScript', 'MLE', 'APEX', 'Database', '23ai']
  },
  {
    id: '5',
    title: '🔒 Stop Hardcoding Passwords: Securing Apps with OCI Vault',
    excerpt: 'Cloud Security: Never store passwords in plain text. Master OCI Vault for centralized secrets management, auto-rotation, and secure database linking.',
    content: `
      ## 🔒 Stop Hardcoding Passwords: Securing Apps with OCI Vault
      
      **Introduction**
      One of the biggest causes of massive corporate data breaches isn't elite hackers breaking through firewalls. It is developers accidentally uploading a piece of code to GitHub that contains a hardcoded database password or an AWS/Stripe API key. Once that code is pushed, bots scrape the key in milliseconds, and the company is compromised.

      In modern cloud architecture, your database and your application code should **never** store passwords in plain text. Instead, we use a centralized, highly secure lockbox. In the Oracle ecosystem, this is called **Oracle Cloud Infrastructure (OCI) Vault**.

      ### 1. The Problem: Hardcoded Secrets
      **The Performance & Security Killer:** Let's say your Oracle Database needs to call the Stripe REST API to process a user's credit card. To authenticate, Stripe requires a secret API token. Historically, developers would just paste this token directly into their PL/SQL package or APEX application. If anyone gains read-access to the database source code, they instantly steal the financial token.

      **The Fix: Centralized Secrets Management.** OCI Vault physically separates your secrets from your code. You store the API key in the Vault, and your code only asks for it exactly when it needs it.
      
      **🚫 The Old Way (Massive Security Risk):**
      \`\`\`sql
      CREATE OR REPLACE PROCEDURE charge_credit_card (p_amount NUMBER) IS
          v_stripe_api_key VARCHAR2(100) := 'sk_live_51H...SecretTokenHere'; -- NEVER DO THIS!
      BEGIN
          -- Code to call external REST API using the hardcoded token
      END;
      \`\`\`

      ### 2. What exactly is OCI Vault?
      OCI Vault provides two distinct services to keep your architecture secure:
      - **Keys (KMS):** Cryptographic Master Keys used to encrypt the actual data files sitting on your hard drives (Transparent Data Encryption). 
      - **Secrets:** Passwords, SSH keys, authentication tokens, and API keys. The Vault encrypts these secrets, tracks exactly who views them, and allows you to auto-rotate them every 30 days without changing your application code.

      ### 3. Linking Vault to Autonomous Database
      **The Problem:** If the secret is stored in OCI Vault, how does the database safely get it without needing another password to log into the Vault?

      **The Fix: Resource Principals & DBMS_CLOUD.** Oracle Autonomous Database runs on OCI. You can grant the database itself an "IAM Policy" (Identity and Access Management) allowing it to read the Vault. Then, you use \`DBMS_CLOUD\` to link the Vault Secret directly to a database credential using its OCID (Oracle Cloud Identifier).
      
      **✅ The Modern Way:**
      \`\`\`sql
      BEGIN
          -- The database securely points to the Vault Secret. 
          -- The actual password text is NEVER stored in the database!
          DBMS_CLOUD.CREATE_CREDENTIAL(
              credential_name => 'STRIPE_API_CRED',
              secret_ocid     => 'ocid1.vaultsecret.oc1.iad.xxxxx...'
          );
      END;
      /

      -- Now, use the safe 'STRIPE_API_CRED' name when calling web services
      BEGIN
          DBMS_CLOUD.SEND_REQUEST(
              uri             => 'https://api.stripe.com/v1/charges',
              credential_name => 'STRIPE_API_CRED',
              method          => 'POST'
          );
      END;
      \`\`\`

      ### 4. OCI Vault Integration in Oracle APEX
      **The Problem:** APEX developers constantly build applications on top of external REST APIs (like GitHub, Salesforce, or Oracle SaaS). They need a way to pass authorization tokens securely without exposing them to end-users in the browser.

      **The Fix: APEX Web Credentials + OCI Vault.** Oracle APEX has a built-in feature called **Web Credentials**. In modern APEX versions, when you create a new Web Credential, you don't even type the password into APEX. You just select "OCI Vault" from a dropdown menu, paste the Secret OCID, and APEX handles the secure injection at runtime!

      1. Go to **Workspace Utilities > Web Credentials**
      2. Set Credential Type to **OCI Vault Secret**
      3. Whenever your APEX app makes a REST call, the server silently fetches the token from the Vault and injects it into the HTTP header. The token never touches the frontend JavaScript.

      ### 5. Secret Rotation (The DevOps Dream)
      Security best practices dictate that API keys and passwords should be changed (rotated) every 60 to 90 days. If you hardcoded your passwords, changing them means finding every PL/SQL script, APEX app, and Node.js server that uses the password, updating the code, and redeploying the whole system (causing downtime).

      With OCI Vault, you simply log into the Cloud Console and update the Secret. Because your database and APEX apps are only pointing to the *OCID pointer*, they automatically start using the new password on their next request. **Zero code changes. Zero downtime.**

      ---
      ### 🎓 Summary for Developers & DBAs
      Security is no longer just the DBA's job; it is the developer's responsibility to write secure code. 
      1. Never hardcode strings like \`v_password := 'secret123'\`.
      2. Store all API tokens, SSH keys, and passwords in **OCI Vault**.
      3. Use \`DBMS_CLOUD.CREATE_CREDENTIAL\` to reference Vault secrets in your SQL code safely.
      4. Use **APEX Web Credentials** to securely consume REST APIs in low-code apps.

      > **💡 Instructor Challenge:** Log into your OCI Free Tier account. Search for "Vault" in the top search bar. Create a new Vault, generate a Master Encryption Key, and then create a Secret named \`MY_DB_PASSWORD\`. Try retrieving its OCID and linking it to your Autonomous Database using the \`DBMS_CLOUD\` package!
    `,
    author: 'Security Architect',
    date: 'Mar 01, 2026',
    category: 'Security',
    image: '/oci_vault.png',
    tags: ['Security', 'OCI', 'Vault', 'Secrets']
  },
  {
    id: '6',
    title: 'JSON Relational Duality: The Best of Both Worlds',
    excerpt: 'A deep dive into 23c feature that allows you to treat relational data as JSON documents.',
    content: `
      ## No More Compromise
      JSON Relational Duality views allow developers to work with JSON documents while the database handles normalization and ACID compliance.

      ### How it Works
      - Define a view based on relational tables.
      - Perform GET/PUT/POST operations on the JSON view.
      - Oracle handles the mapping back to columns and rows automatically.

      This is arguably the most significant architectural shift in Oracle Database history...
    `,
    author: 'Data Architect',
    date: 'Nov 15, 2024',
    category: 'Database',
    image: '/Json.jpg',
    tags: ['JSON', 'Database', 'Architecture']
  },
  {
    id: '7',
    title: 'Mastering OCI Networking: VCN and Beyond',
    excerpt: 'Building robust and scalable network architectures in Oracle Cloud Infrastructure.',
    content: `
      ## The Foundation of Cloud
      Virtual Cloud Networks (VCNs) are the cornerstone of any OCI deployment. Understanding subnets, gateways, and DRGs is essential.

      ### Best Practices
      - Use Hub-and-Spoke architecture for enterprise scale.
      - Implement Network Security Groups (NSGs) instead of generic Security Lists.
      - Leverage OCI Service Gateway for private access to Oracle services.

      A well-designed network prevents security breaches and optimizes latency across regions...
    `,
    author: 'Cloud Architect',
    date: 'Nov 18, 2024',
    category: 'Cloud',
    image: '/VCN.png',
    tags: ['Networking', 'OCI', 'VCN']
  },
  {
    id: '8',
    title: 'Real-Time Monitoring with OCI Observability',
    excerpt: 'Leverage Logging Analytics and Management Cloud to keep your Oracle environment healthy.',
    content: `
      ## Proactive Operations
      OCI Observability and Management provides a holistic view of your database and application performance.

      ### Key Tools
      - **Database Management Service**: Detailed performance hub in the cloud.
      - **Stack Monitoring**: Track health of all components in your stack.
      - **Logging Analytics**: Use AI to find patterns in Terabytes of log data.

      Don't wait for users to report issues; identify bottlenecks before they impact production...
    `,
    author: 'DevOps Lead',
    date: 'Nov 22, 2024',
    category: 'Cloud',
    image: '/Oracle Observability.png',
    tags: ['DevOps', 'Monitoring', 'OCI']
  }
];

export const CATEGORIES = ['All', 'APEX', 'Database', 'Cloud', 'SQL', 'PL/SQL', 'Javascript', 'Security'];

export const CATEGORY_ICONS: Record<string, string> = {
  'All': 'fa-globe',
  'APEX': 'fa-layer-group',
  'Database': 'fa-database',
  'Cloud': 'fa-cloud',
  'SQL': 'fa-code',
  'PL/SQL': 'fa-terminal',
  'Javascript': 'fa-brands fa-js',
  'Security': 'fa-shield-halved'
};
