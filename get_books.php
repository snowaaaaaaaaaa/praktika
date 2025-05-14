<?php
header('Content-Type: application/json');

if (!isset($_GET['specialty'])) {
    echo json_encode([]);
    exit;
}

$specialty = $_GET['specialty'];

try {
    $pdo = new PDO('sqlite:books.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare('SELECT title, author, year FROM books WHERE specialty = :specialty');
    $stmt->bindParam(':specialty', $specialty, PDO::PARAM_STR);
    $stmt->execute();

    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($books);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
