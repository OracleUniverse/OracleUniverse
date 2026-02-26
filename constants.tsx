
import { BlogPost } from './types';

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
    title: 'Optimizing SQL Queries in Oracle 23c',
    excerpt: 'Explore the new AI-powered query optimization features in the latest Oracle Database 23c release.',
    content: `
      ## The Evolution of Query Optimization
      Oracle Database 23c introduces several revolutionary features aimed at making SQL optimization more efficient than ever. 
      One of the standout features is **AI Vector Search**, which allows for seamless integration of structured and unstructured data.

      ### New Features in 23c
      1. **SQL Transpilation**: Automatically convert SQL dialects to Oracle SQL.
      2. **Automatic SQL Tuning Sets**: Improved background optimization.
      3. **Boolean Data Type**: Finally, a native boolean type in Oracle!

      To optimize your queries, focus on the new execution plan hints and the automated indexing capabilities...
    `,
    author: 'Oracle Guru',
    date: 'Oct 15, 2024',
    category: 'SQL',
    image: '/Optimize SQL.jpg',
    tags: ['SQL', '23c', 'Performance']
  },
  {
    id: '2',
    title: 'Getting Started with OCI Autonomous Database',
    excerpt: 'A comprehensive guide to deploying and managing your first Autonomous Database on Oracle Cloud.',
    content: `
      ## Why Autonomous?
      Oracle's Autonomous Database is self-driving, self-securing, and self-repairing. It eliminates the mundane tasks of a DBA.

      ### Deployment Steps
      - Sign up for an OCI Free Tier account.
      - Navigate to Oracle Database -> Autonomous Database.
      - Select 'Always Free' for your first instance.

      The benefits include automatic patching and scaling that responds to your workload in real-time...
    `,
    author: 'Cloud Architect',
    date: 'Oct 20, 2024',
    category: 'Cloud',
    image: '/Autonomous DB.jpg',
    tags: ['Cloud', 'OCI', 'Autonomous']
  },
  {
    id: '3',
    title: 'Advanced PL/SQL Patterns for Modern Apps',
    excerpt: 'Master advanced collections and bulk processing to supercharge your PL/SQL applications.',
    content: `
      ## Mastering Collections
      PL/SQL is not just for simple logic. Using Nested Tables and Associative Arrays efficiently can reduce context switching.

      ### Bulk Operations
      Always use \`FORALL\` and \`BULK COLLECT\` when dealing with large datasets. 
      
      \`\`\`sql
      FORALL i IN 1..l_data.COUNT
        INSERT INTO target_table VALUES l_data(i);
      \`\`\`

      This approach minimizes the performance hit of switching between the SQL and PL/SQL engines...
    `,
    author: 'Dev Master',
    date: 'Nov 2, 2024',
    category: 'PL/SQL',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop',
    tags: ['PL/SQL', 'Development', 'Performance']
  },
  {
    id: '4',
    title: 'Java Microservices with Micronaut and GraalVM',
    excerpt: 'Learn how to build lightning-fast Java microservices optimized for the Oracle Cloud ecosystem.',
    content: `
      ## Java Excellence on OCI
      The combination of Micronaut and GraalVM Native Image allows Java applications to start in milliseconds with minimal memory overhead.

      ### Key Advantages
      - **Native Compilation**: Convert bytecode to native machine code.
      - **OCI SDK Integration**: Built-in support for Oracle Cloud services.
      - **Serverless Readiness**: Perfect for OCI Functions.

      By leveraging GraalVM, we can achieve performance metrics previously reserved for C++ applications...
    `,
    author: 'Java Specialist',
    date: 'Nov 8, 2024',
    category: 'Java',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    tags: ['Java', 'GraalVM', 'Micronaut']
  },
  {
    id: '5',
    title: 'Securing Your Database with OCI Vault',
    excerpt: 'Best practices for managing encryption keys and secrets using Oracle Cloud Vault.',
    content: `
      ## Security First
      OCI Vault provides a managed service for storing master encryption keys and database credentials securely.

      ### Implementation Steps
      1. Create a Vault and Master Encryption Key (MEK).
      2. Integrate with Transparent Data Encryption (TDE).
      3. Rotate secrets automatically with OCI Functions.

      Securing the database at the storage level is no longer optional in the modern security landscape...
    `,
    author: 'Security Officer',
    date: 'Nov 12, 2024',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    tags: ['Security', 'Encryption', 'OCI']
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

export const CATEGORIES = ['All', 'APEX', 'Database', 'Cloud', 'SQL', 'PL/SQL', 'Java', 'Security'];

export const CATEGORY_ICONS: Record<string, string> = {
  'All': 'fa-globe',
  'APEX': 'fa-layer-group',
  'Database': 'fa-database',
  'Cloud': 'fa-cloud',
  'SQL': 'fa-code',
  'PL/SQL': 'fa-terminal',
  'Java': 'fa-mug-hot',
  'Security': 'fa-shield-halved'
};
