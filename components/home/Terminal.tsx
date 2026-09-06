// The hero terminal, ported verbatim from design/home-reference.html.
//
// DELIBERATELY HAND-COLOURED. DO NOT CONVERT THIS TO CodeBlock.
//
// The spans below are editorial, not lexical. A syntax highlighter
// tokenises by grammar: it cannot know that a cost figure should be red
// for emphasis, that "3 passed" should be green because passing is good,
// or that a resource type should be the accent while its logical name
// stays plain. Shiki would colour this by shell grammar and lose every
// one of those decisions. The SDK and HCL panels below DO use CodeBlock,
// because there the colouring genuinely is lexical.
//
// DELIBERATELY AHEAD OF THE BINARY. The cost delta, the invariants line
// and the SUMMARY block are not output ubx produces today. That is
// tracked as UBI-251 and the design leads the product here on purpose.
// Do not "correct" this to real `ubx plan` output.
export function Terminal() {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="terminal-label">payments</span>
      </div>
      <div className="terminal-body">
        {`$ ubx plan --stack payments\n\n`}
        <span className="com">Proposal</span> <span className="prop">9f3a81</span>{"  "}
        <span className="com">·  resolved against live state</span>
        {`\n\n`}
        <span className="kw">+</span> <span className="type">aws.rds.DbInstance</span>
        {"        main          "}<span className="com">db.r6g.large · 100 GB</span>{"\n"}
        <span className="kw">+</span> <span className="type">aws.rds.DbInstance</span>
        {"        replica       "}<span className="com">eu-west-1b</span>{"\n"}
        <span className="kw">+</span> <span className="type">aws.sqs.Queue</span>
        {"             settlements   "}<span className="com">retention 4d</span>{"\n"}
        <span className="prop">~</span> <span className="type">aws.ec2.SecurityGroup</span>
        {"     db-access     "}<span className="str">1 rule added</span>
        {`\n\n`}
        <span className="com">blast radius</span>{"  "}<span className="kw">+3</span>{" "}
        <span className="prop">~1</span> <span className="str">-0</span>{"\n"}
        <span className="com">cost delta</span>{"    "}<span className="str">+$244.00 / month</span>
        {"   "}<span className="com">(current $1,118 → $1,362)</span>{"\n"}
        <span className="com">invariants</span>{"    "}<span className="kw">3 passed</span>
        {"   "}<span className="com">never-public · eu-west-1 · cost ceiling</span>
      </div>
      <div className="terminal-note">
        <div className="note-head">&#9670; SUMMARY</div>
        <p>
          Adds a primary Postgres instance with a read replica in a second availability
          zone, plus a settlement queue holding four days of messages. The existing
          security group gains one ingress rule scoped to the new database, so nothing
          becomes publicly reachable.
        </p>
        <p>
          The replica is the largest share of the cost increase. Both instances sit
          inside the existing VPC, pinned to the network stack at head{" "}
          <span style={{ fontFamily: "var(--mono)", color: "var(--yellow)" }}>4b1e77</span>.
        </p>
      </div>
      <div className="terminal-foot">
        <span>hash frozen · stale on drift</span>
        <span>awaiting signature</span>
      </div>
    </div>
  );
}
