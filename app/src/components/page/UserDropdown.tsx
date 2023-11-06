import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import React from 'react';
import { UserContext } from '@/context';
import { UserContextProps } from '@/context/UserContext';


export default function UserDropdown(){
    const {name, logoff} = React.useContext(UserContext) as UserContextProps
    return (
        <div className="absolute text-left left-6 top-5">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant={"outline"} className='text-md'>Olá, {name}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 ml-2">
                    <DropdownMenuLabel className='font-normal text-sm'>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {logoff()}} className="text-red-600 font-light hover:text-red-500 hover:cursor-pointer">
                            Sair do sistema
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}