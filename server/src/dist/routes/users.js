import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    res.status(200).json({ users: [{ id: 0, name: "kristofer" }] });
});
export default router;
//# sourceMappingURL=users.js.map