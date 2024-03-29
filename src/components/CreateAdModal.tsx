import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import Input from './Form/Input';


export default function CreateAdModal({ setGamesHome, gamesHome }: any) {

    interface Game {
        id: string;
        title: string;
    }

    const [games, setGames] = useState<Game[]>([])
    // const [NewListgames, setNewListGames] = useState<[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        // axios('http://localhost:8080/games').then(response => {
        //     setGames(response.data)
        // })
        setGames(
            [
                {
                    "id": "a8827c79-5a73-4743-aa3b-ccd5fa204d50",
                    "title": "League of Legends",
                },
                {
                    "id": "50dcfc4e-14d1-4549-abe9-c9aeca61ba5d",
                    "title": "Counter-Strike: Global Offensive",
                },
                {
                    "id": "d455284a-c460-4ead-908c-2c3934eb4c86",
                    "title": "VALORANT",
                },
                {
                    "id": "2f9dc062-fe72-49dd-99e7-bebbdec2b15d",
                    "title": "Fall Guys",
                },
                {
                    "id": "fffa483d-1142-47da-8f35-31b5303aff97",
                    "title": "FIFA 23",
                },
                {
                    "id": "7499ecf5-0539-4321-ad26-1cca166f2ee1",
                    "title": "The Last of Us Part I",
                }
            ]
        )
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.name) {
            return
        }
        var teste = []
        for (let index = 0; index < gamesHome.length; index++) {

            if (gamesHome[index].id == data.game) {
                teste[index] = {
                    "id": gamesHome[index].id,
                    "title": gamesHome[index].title,
                    "bannerUrl": gamesHome[index].bannerUrl,
                    "_count": {
                        "ads": gamesHome[index]._count.ads + 1
                    }
                }
            } else {
                teste[index] = gamesHome[index];
            }

        }

        setGamesHome(teste)

        // await axios.post(`http://localhost:8080/games/${data.game}/ads`, {
        //     "name": data.name,
        //     "yearsPlaying": Number(data.yearsPlaying),
        //     "discord": data.discord,
        //     "weekDays": weekDays.map(Number),
        //     "hourStart": data.hourStart,
        //     "hourEnd": data.hourEnd,
        //     "useVoiceChannel": useVoiceChannel,
        // })
        // alert('Anúncio criado com sucesso!')
        // alert('Erro ao criar o anúncio!')
    }

    return (

        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='game' className='font-semibold'>Qual o game?</label>
                        <select
                            name='game'
                            id='game'
                            className='bg-zinc-900 py-3 px-4 rounded text-sm placehouder:text-zinc-500 appearance-none'
                            defaultValue=''
                        >
                            <option disabled value=''>
                                Selecione o game que deseja jogar
                            </option>

                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name'>Seu nome (ou nickname)</label>
                        <Input name='name' id='name' placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                            <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='discord'>Qual o seu Discord?</label>
                            <Input name='discord' id='discord' placeholder='Usuario#0000' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='weekdays'>Quando costuma jogar?</label>

                            <ToggleGroup.Root
                                className='grid grid-cols-4 gap-2'
                                type='multiple'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value='0'
                                    title='Domingo'
                                    className={`w-8 h-8 roudend ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='1'
                                    title='Segunda'
                                    className={`w-8 h-8 roudend ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='2'
                                    title='Terça'
                                    className={`w-8 h-8 roudend ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='3'
                                    title='Quarta'
                                    className={`w-8 h-8 roudend ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='4'
                                    title='Quita'
                                    className={`w-8 h-8 roudend ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='5'
                                    title='Sexta'
                                    className={`w-8 h-8 roudend ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='6'
                                    title='Sábado'
                                    className={`w-8 h-8 roudend ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor='hourStart'>Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input name='hourStart' id='hourStart' type='time' placeholder='De' />
                                <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            className='w-6 h-6 p-1 rounded bg-zinc-900'
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                        >
                            <Checkbox.Indicator><Check className='w-4 h-4 text-emerald-400' /></Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            type='button'
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                        >
                            Cancelar
                        </Dialog.Close>
                        <button
                            type='submit'
                            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                        >
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}