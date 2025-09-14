import Team from "../models/Team.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";

let otpStore = {}; // { email: otp }

export const registerTeam = async (req, res) => {
  try {
    const { teamName, teamLeader, members, college, track } = req.body;

    // Generate unique team number
    const teamNumber = "HTX" + Math.floor(1000 + Math.random() * 9000);

    const newTeam = new Team({
      teamName,
      teamLeader,
      members,
      college,
      track,
      teamNumber
    });

    await newTeam.save();

    // Generate OTP & send email
    const otp = generateOTP();
    otpStore[teamLeader.email] = otp;

    await sendEmail(
      teamLeader.email,
      "Hackathon OTP Verification",
      `Your OTP is ${otp}`,
      `<p>Your OTP is <b>${otp}</b></p>`
    );

    res.status(201).json({ message: "Team registered. OTP sent.", teamNumber });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (otpStore[email] && otpStore[email] === otp) {
      const team = await Team.findOne({ "teamLeader.email": email });
      team.isVerified = true;
      await team.save();

      delete otpStore[email];
      return res.json({ message: "✅ Verification successful" });
    }

    res.status(400).json({ error: "❌ Invalid OTP" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamStatus = async (req, res) => {
  try {
    const team = await Team.findOne({ teamNumber: req.params.id });
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
