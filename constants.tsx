
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

export const CATEGORIES = ['All', 'Database', 'Cloud', 'SQL', 'PL/SQL', 'Java', 'Security'];

export const CATEGORY_ICONS: Record<string, string> = {
  'All': 'fa-globe',
  'Database': 'fa-database',
  'Cloud': 'fa-cloud',
  'SQL': 'fa-code',
  'PL/SQL': 'fa-terminal',
  'Java': 'fa-mug-hot',
  'Security': 'fa-shield-halved'
};
