const {Router} = require("express");
const router = Router();
const userCtrl = require("../controller/user.controller"); 

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.put("/update", userCtrl.updateUser);

module.exports = router; 