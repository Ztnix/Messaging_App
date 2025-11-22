require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function signUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
      select: { id: true, username: true },
    });
    return res.status(201).json({ success: true, user, redirect: "/home" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function setUser(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          username: true,
        },
      });

      return res.json({
        user: { id: user.id, username: user.username },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(401).json({ user: null });
}

async function logOut(req, res, next) {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Session destroy failed" });
      res.clearCookie("connect.sid");
      return res.json({ ok: true });
    });
  });
}

//// Anything but account stuff

async function getUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Users" });
  }
}

async function getChats(req, res, next) {
  const userId = req.user.id;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    res.json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Chats" });
  }
}

async function newChat(req, res, next) {
  const target = req.body.targetUser;
  const user = req.user;
  try {
    const chat = await prisma.chat.create({
      data: {
        title: "filler",
        content: "filler",
        users: {
          connect: [{ id: user.id }, { id: target.id }],
        },
      },
      include: {
        users: true,
      },
    });

    return res.status(201).json({ success: true, redirect: "/" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  logOut,
  signUp,
  setUser,
  getUsers,
  getChats,
  newChat,
};
