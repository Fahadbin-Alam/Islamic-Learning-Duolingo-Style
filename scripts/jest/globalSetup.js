// Run every test in UTC, the zone CI uses, so date and prayer-time tests read the same on any machine.
module.exports = () => {
  process.env.TZ = "UTC";
};
