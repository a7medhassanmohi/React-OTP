import React,{createContext, useContext} from 'react'

const TextContext=createContext<{isOpen:boolean}|null>(null)

export function useTextContext(){
    const context=useContext(TextContext)
    if(!context) {
        throw new Error("make sure your component inside the context")
    }
    return context
}

const Test = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>  > (({ className, ...props }, ref)=>{
    return <TextContext.Provider value={{isOpen:true}}>
        <div
        ref={ref}
        className={className}
        {...props}
        />
    </TextContext.Provider>
})
const TestTitle = React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement> > (({ className, ...props }, ref)=>{
    const {isOpen}=useTextContext()
    return <p
    ref={ref}
    style={{backgroundColor:isOpen? "red":"blue"}}
    className={className}
    {...props}
    />
})


export const TestComp = Object.assign(
    Test,
    {
        TestTitle: TestTitle,
      
    }
  );