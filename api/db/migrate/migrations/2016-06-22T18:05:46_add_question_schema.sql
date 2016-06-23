--
-- add_question_schema
--

CREATE SCHEMA question;

CREATE TABLE question.question (
  {{col.__deleted}},
  {{col.timestamps}},
  {{col.id}},
  prompt text NOT NULL,
  __bag json
);
