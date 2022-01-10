class AdminRules {
    constructor() {
      this.rules = {
        ADMIN: 'admin'
      };
    }
    getRules() {
      return this.rules;
    }
    getRuleName(rule) {
      switch (rule) {
        case this.rules.ADMIN:
          return 'Admin';
        default:
      }
    }
  }
  export default AdminRules;