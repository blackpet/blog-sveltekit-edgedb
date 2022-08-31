module default {
  type User {
    required property login_id -> str {
      constraint exclusive;
    };
    required property email -> str {
      constraint exclusive;
    };
    required property name -> str;
  }

  type Post {
    required property title -> str;
    required property content -> str;
    required property created_at -> datetime;
    required property last_modified_at -> datetime;

    required link created_by -> User;
    required property read_count -> int64 {
      default := 0;
    }
    property status -> str {
      constraint one_of('Draft', 'InReview', 'Published');
      default := 'Draft';
    }
  }
}
