import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  useEffect(() => {
    if (!slug) {
      setSelectedPerson(null);

      return;
    }

    if (people.length === 0) {
      return;
    }

    const person = people.find(currentPerson => currentPerson.slug === slug);

    if (person) {
      setSelectedPerson(person.name);
    } else {
      setSelectedPerson(null);
    }
  }, [slug, people]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <PeopleTable
          people={people}
          selectedPerson={selectedPerson}
        />
      </div>
    </div>
  );
};
