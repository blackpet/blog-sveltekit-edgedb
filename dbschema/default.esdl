module default {
  type User {
    required property email -> str {
      constraint exclusive;
    };
    required property name -> str;
    required property password -> str {
      default := '1234';
      constraint min_len_value(4);
    };
    property created_at -> datetime {
      default := datetime_current();
    };
    property last_modified_at -> datetime {
      default := datetime_current();
    };
  }

  type Post {
    required property title -> str;
    required property content -> str;
    property created_at -> datetime {
      default := datetime_current();
    };
    property last_modified_at -> datetime {
      default := datetime_current();
    };

    required link created_by -> User;
    required property read_count -> int64 {
      default := 0;
    }
    property status -> str {
      constraint one_of('Draft', 'InReview', 'Published');
      default := 'Draft';
    }

    multi link likes := (.<post[is PostLike]);
    property like_count := count(.likes filter .type = 'Like');
    property dislike_count := count(.likes filter .type = 'Dislike');
  }

  type PostLike {
    required link post -> Post;
    required link user -> User;
    required property type -> str {
      constraint one_of('Like', 'Dislike');
    };
    property created_at -> datetime {
      default := datetime_current();
    };
  }

}
