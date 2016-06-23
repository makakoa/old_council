--
-- add_question_schema
--

CREATE SCHEMA question;

CREATE TABLE question.question (
  {{col.__deleted}},
  {{col.timestamps}},
  {{col.id}},
  prompt text NOT NULL
);

CREATE TABLE question.choice (
  {{col.__deleted}},
  {{col.timestamps}},
  question_id bigint NOT NULL,
  description text NOT NULL,
  votes int,

  FOREIGN KEY (question_id) REFERENCES question.question (id)
);
