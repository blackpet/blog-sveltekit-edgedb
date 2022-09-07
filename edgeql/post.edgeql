
// @deprecated
select Post {
  id,
  content,
  read_count,
  status,
  title,
  created_at,
  last_modified_at,
  created_by,
  likes: {
    id,
    created_at,
    type,
    user: {
      name
    }
  },
  like_count := count(.<post[is PostLike] filter .type = 'Like'),
  my_like := (select .<post[is PostLike] {
    id,
    type
  } filter .user.id = <uuid>'05fbab58-28b6-11ed-b9ed-d3acf0fccf2a')
}

// @final !!!
select Post {
  id,
  content,
  read_count,
  status,
  title,
  created_at,
  last_modified_at,
  created_by,
  likes: {
    id,
    created_at,
    type,
    user: {
      name
    }
  },
  like_count := count(.likes filter .type = 'Like'),
  dislike_count := count(.likes filter .type = 'Dislike'),
  my_like := (select .<post[is PostLike] {
    id,
    type
  } filter .user.id = <uuid>'05fbab58-28b6-11ed-b9ed-d3acf0fccf2a')
}

select Post {
  id,
  title,
  content,
  read_count,
  status,
  created_at,
  last_modified_at,
  created_by,
  likes: {
    type,
    user: {
      name
    }
  },
  like_count,
  dislike_count,
  my_like := (select PostLike {
    type
  } filter .user.id = <uuid>'05fbab58-28b6-11ed-b9ed-d3acf0fccf2a')   <------------- 실패!! (joined data 아님)
}

insert PostLike {
  post := (select Post filter = .id = <uuid>'22239f6c-2dc9-11ed-b38d-3be5bb6b969a'),
  user := (select User filter = .id = <uuid>'32662490-2ab2-11ed-bf95-2f710f6bccda'),
  type := 'Like'
}


with my_like := (
  select PostLike {id, type}
  filter .post.id = <uuid>'22239f6c-2dc9-11ed-b38d-3be5bb6b969a'
  and .user.id = <uuid>'05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'
)
select <str>'exists' if exists my_like
else (select <str>'nono')


with MyLike := (
  select PostLike {id, type}
  filter .post.id = <uuid>'22239f6c-2dc9-11ed-b38d-3be5bb6b969a'
  and .user.id = <uuid>'05fbab58-28b6-11ed-b9ed-d3acf0fccf2a'
)
select MyLike {
  id, type
}
