class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async gotoLogin() {
    await this.page.goto("/login");
  }

  async gotoSignup() {
    await this.page.goto("/signup");
  }

  async signup({ name, email, password, role = "patient" }) {
    await this.gotoSignup();
    // Role is chosen via card buttons (Patient is default; only click if switching to Doctor)
    if (role === "doctor") {
      await this.page.getByRole("button", { name: /Doctor/ }).click();
    }
    await this.page.fill("#name", name);
    await this.page.fill("#email", email);
    await this.page.fill("#password", password);
    await this.page.getByRole("button", { name: "Create Account" }).click();
  }

  async login(email, password) {
    await this.gotoLogin();
    await this.page.fill("#email", email);
    await this.page.fill("#password", password);
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }
}

module.exports = LoginPage;
