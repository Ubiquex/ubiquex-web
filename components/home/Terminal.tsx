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
// UBI-251, RESOLVED. This block used to carry three things ubx did not
// produce, on the arrangement that the design led the product. Two of
// them turned out to be claims the binary cannot make, so the design
// changed instead, which was the other half of that arrangement.
//
// The SUMMARY block is real now. `ubx plan` renders an authored intent's
// summary sentence under the header, gated on the intent's source kind
// so the mechanical templates scan and restore write never print.
//
// The cost delta line is gone. Every writer of CostDelta sets a literal
// 0 and there is no pricing source in the tree, so the binary now
// renders no cost line at all rather than "$0/mo". A figure here would
// have promised something nothing can compute.
//
// The invariants line is gone. That field has no writer and no renderer,
// and the policy engine behind it is held under UBI-118 with the shape
// of a policy result explicitly undecided. Drawing it here would have
// settled that design question by accident, in a marketing page.
//
// The summary's second paragraph went with them, because its first
// sentence was a cost claim. Its second, about the VPC and the
// cross-stack pin, is genuinely knowable and could be folded into the
// paragraph above if wanted.
//
// Still hand-coloured, per the note above. Keep in step with
// design/home-reference.html, which carries the identical block.
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
        <span className="prop">~1</span> <span className="str">-0</span>
      </div>
      <div className="terminal-note">
        <div className="note-head">&#9670; SUMMARY</div>
        <p>
          Adds a primary Postgres instance with a read replica in a second availability
          zone, plus a settlement queue holding four days of messages. The existing
          security group gains one ingress rule scoped to the new database, so nothing
          becomes publicly reachable.
        </p>
      </div>
      <div className="terminal-foot">
        <span>hash frozen · stale on drift</span>
        <span>awaiting signature</span>
      </div>
    </div>
  );
}
