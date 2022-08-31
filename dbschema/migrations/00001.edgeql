CREATE MIGRATION m16h3ofa5ia7gdo6pjnrlomhyclpnrct3n4tnkw7jjvxop2rqmmafa
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY email -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY login_id -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name -> std::str;
  };
  CREATE TYPE default::Post {
      CREATE REQUIRED LINK created_by -> default::User;
      CREATE REQUIRED PROPERTY content -> std::str;
      CREATE REQUIRED PROPERTY created_at -> std::datetime;
      CREATE REQUIRED PROPERTY last_modified_at -> std::datetime;
      CREATE REQUIRED PROPERTY read_count -> std::int64 {
          SET default := 0;
      };
      CREATE PROPERTY status -> std::str {
          SET default := 'Draft';
          CREATE CONSTRAINT std::one_of('Draft', 'InReview', 'Published');
      };
      CREATE REQUIRED PROPERTY title -> std::str;
  };
};
