import Admin from "../models/Admin.js";
import Team from "../models/Team.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markQualified = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: "Team not found" });

    team.qualified = true;
    await team.save();

    res.json({ message: "Team qualified" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import { Parser } from "json2csv";

export const exportCSV = async (req, res) => {
  try {
    const teams = await Team.find().lean();
    const parser = new Parser({ fields: ["teamName", "teamNumber", "college", "track", "isVerified", "qualified"] });
    const csv = parser.parse(teams);

    res.header("Content-Type", "text/csv");
    res.attachment("teams.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const sendCertificate = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ error: "Team not found" });

    await sendEmail(
      team.teamLeader.email,
      "Hackathon Certificate",
      "Congratulations! Attached is your certificate.",
      `<h3>Congratulations ${team.teamName}!</h3><p>Your team has successfully participated.</p>`
    );

    res.json({ message: "Certificate sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

