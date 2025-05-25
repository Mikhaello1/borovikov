export default function getExpressionAfterEquals(equation) {
    const parts = equation.split('=');
    if (parts.length > 1) {
        return parts[1].trim(); 
    }
    return equation; 
}