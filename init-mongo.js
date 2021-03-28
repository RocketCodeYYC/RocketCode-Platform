db.createUser(
  {
    user: "appuser",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "dev"
      }
    ]
  }
)