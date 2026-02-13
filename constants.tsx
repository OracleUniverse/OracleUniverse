
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
    image: '/tree2.jpg',
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
    image: '/VectorSearch.jpg',
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
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f923?q=80&w=800&auto=format&fit=crop',
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
