import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface iFood {
	id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export function Dashboard() {
	const [foods, setFoods] = useState<iFood[]>([]); 
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingFood, setEditingFood] = useState<iFood>();

	useEffect(() => {
		const response = async () => {
				const response = await api.get<iFood[]>('/foods');	
				const data = response.data;			
				setFoods(data);
		}

		response()
	}, []);

  async function handleAddFood(food: iFood) {	
    try {
      const response = await api.post<iFood>('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: iFood) {
    try {
      const foodUpdated = await api.put(
        `/foods/${food.id}`,
        { ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`);

    const foodsFiltered = foods.filter(food => food.id !== foodId);

		setFoods(foodsFiltered);
  }

	function handleEditFood(food: iFood) {
		setEditingFood(food);
		setEditModalOpen(true);
  }

  function toggleModal() {
    setAddModalOpen(!addModalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

    return (
				<>
					<Header openModal={toggleModal} />
					<ModalAddFood
						isOpen={addModalOpen}
						setIsOpen={toggleModal}
						handleAddFood={handleAddFood}
					/>
					<ModalEditFood
						isOpen={editModalOpen}
						setIsOpen={toggleEditModal}
						editingFood={editingFood}
						handleUpdateFood={handleUpdateFood}
					/>

					<FoodsContainer data-testid="foods-list">
						{foods &&
							foods.map(food => (
								<Food
									key={food.id}
									food={food}
									handleDelete={handleDeleteFood}
									handleEditFood={handleEditFood}
								/>
							))}
					</FoodsContainer>
				</>
    );
};