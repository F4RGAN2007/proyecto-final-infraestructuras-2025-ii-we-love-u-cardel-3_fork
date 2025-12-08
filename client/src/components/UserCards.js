export { default } from './UserCards.jsx'

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: #333;
  margin: 0;
`;

const CardInfo = styled.div`
  margin: 0.5rem 0;
  color: #666;
`;

const Label = styled.span`
  font-weight: bold;
  color: #667eea;
  margin-right: 0.5rem;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const Timestamp = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 1rem;
  text-align: right;
`;

function UserCards() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando perfiles...</div>;
  }

  return (
    <div>
      <h2>Perfiles de la Comunidad ({users.length})</h2>
      <CardsContainer>
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardInfo>@{user.username}</CardInfo>
            </CardHeader>
            
            <CardInfo>
              <Label>Edad:</Label> {user.age} años
            </CardInfo>
            
            <CardInfo>
              <Label>Género:</Label> {user.gender}
            </CardInfo>
            
            {user.race && (
              <CardInfo>
                <Label>Raza/Etnia:</Label> {user.race}
              </CardInfo>
            )}
            
            {user.sexual_orientation && (
              <CardInfo>
                <Label>Orientación:</Label> {user.sexual_orientation}
              </CardInfo>
            )}
            
            {user.description && (
              <Description>{user.description}</Description>
            )}
            
            <Timestamp>
              Registrado: {format(new Date(user.created_at), 'dd/MM/yyyy HH:mm')}
            </Timestamp>
          </Card>
        ))}
      </CardsContainer>
    </div>
  );
}

export default UserCards;