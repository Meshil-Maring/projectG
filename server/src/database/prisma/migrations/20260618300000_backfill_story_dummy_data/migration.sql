-- Backfill dummy story data: clear photo URLs and populate location, year, fullStory

UPDATE stories SET
  image = '',
  location = 'Imphal, Manipur',
  year = '2023',
  "fullStory" = 'Aarav grew up in a small household where his parents worked as daily labourers. When the scholarship programme found him in Class 9, he was on the verge of dropping out. With the support he received, Aarav completed his Class 12 with distinction and is now pursuing a bachelor''s degree in computer science. He dreams of returning to his village and teaching coding to children who, like him, might otherwise have lost hope.'
WHERE name = 'Aarav Kumar';

UPDATE stories SET
  image = '',
  location = 'Thoubal, Manipur',
  year = '2022',
  "fullStory" = 'When a flood destroyed Sunita''s home in 2022, she had nothing left but hope. Project Generation''s disaster relief team reached her village within days, providing temporary shelter, food, and rebuilding support. Today, Sunita''s family lives in a stronger home and she has joined our community volunteer network to help others in times of crisis.'
WHERE name = 'Sunita Devi';

UPDATE stories SET
  image = '',
  location = 'Bishnupur, Manipur',
  year = '2024',
  "fullStory" = 'Rohan first joined Project Generation as a college student looking for meaningful ways to contribute. What started as weekend teaching sessions soon turned into a full commitment. He now leads a team of 20 volunteers coordinating health camps and education drives across three districts. "I came to give," he says, "but I received so much more in return."'
WHERE name = 'Rohan Mehta';

UPDATE stories SET
  image = '',
  location = 'Churachandpur, Manipur',
  year = '2023',
  "fullStory" = 'Priya''s daughter, Deepa, was one of 60 children enrolled in our after-school learning programme. Before joining, Deepa could barely read. Within a year, she stood first in her class. Priya, moved by the transformation, began attending our parent awareness sessions and is now an advocate for girls'' education in her neighbourhood.'
WHERE name = 'Priya Sharma';

UPDATE stories SET
  image = '',
  location = 'Senapati, Manipur',
  year = '2021',
  "fullStory" = 'For years, Meera''s village depended on a contaminated well that made children sick every monsoon. Project Generation''s water sanitation project installed a filtration system and educated families on hygiene practices. Waterborne illnesses in the village dropped by 80% in the following year. Meera says clean water did not just save lives — it gave the village back its dignity.'
WHERE name = 'Meera Nair';

UPDATE stories SET
  image = '',
  location = 'Kangpokpi, Manipur',
  year = '2023',
  "fullStory" = 'Samuel enrolled in our six-month electrician training programme with barely a Class 8 education and no income. By the end, he had passed the certification and secured his first contract. He now runs a small electrical services business employing two assistants from his community. "I used to wonder if someone like me could ever build something," he says. "Now I know I can."'
WHERE name = 'Samuel Osei';

UPDATE stories SET
  image = '',
  location = 'Ukhrul, Manipur',
  year = '2024',
  "fullStory" = 'Fatima came to the literacy programme as a participant — a mother of three who had never been to school. After learning to read and write, she surprised everyone by asking to stay on as a teacher''s aide. Today she runs evening classes for women in her own lane, teaching reading, numeracy, and basic health literacy. She believes every woman who learns becomes a teacher herself.'
WHERE name = 'Fatima Al-Hassan';

UPDATE stories SET
  image = '',
  location = 'Pherzawl, Manipur',
  year = '2022',
  "fullStory" = 'Diego was once a struggling farmer who had lost three consecutive harvests to poor soil management. After attending Project Generation''s agriculture training workshops, he learned about crop rotation and organic composting. His yield doubled in the first season. He then trained 30 other farmers in his area, and their collective income rose by an average of 40%. Diego now leads our agricultural mentorship circle.'
WHERE name = 'Diego Reyes';

-- Allow image to be empty going forward
ALTER TABLE stories ALTER COLUMN image SET DEFAULT '';
