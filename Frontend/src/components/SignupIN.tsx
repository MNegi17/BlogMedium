export const SignupIN = ()=>{
    return(
        <div className="h-screen flex justify-center items-center ">
                        <div className="p-8 w-full lg:w-1/2">
                            <h1 className="text-4xl font-bold mb-2 place-self-center">Create an account</h1>
                            <p className="text-gray-500 mb-6 place-self-center">Already have an account? <a href="#" className="text-gray-700 font-semibold">Login</a></p>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-black font-semibold">Username</label>
                                    <input type="text" placeholder="Enter your username" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-semibold">Email</label>
                                    <input type="email" placeholder="m@example.com" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-black font-semibold">Password</label>
                                    <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" />
                                </div>
                                <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-semibold">Sign Up</button>
                            </form>
                        </div>
                    
        </div>
    )
}